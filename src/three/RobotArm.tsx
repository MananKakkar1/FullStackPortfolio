import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

/**
 * A procedural industrial arm (built from primitives, no model files) that
 * picks project cards out of a fanned rack and presents them. Everything that
 * moves is real 3D: each card is a thin textured panel, so depth, occlusion,
 * and perspective are physically consistent. A gripped card is re-parented to
 * the tool flange (keeping its world transform), so the handoff between rack
 * and gripper is exact.
 *
 * Kinematics: base yaw + shoulder/elbow via closed-form two-link IK (law of
 * cosines) + a wrist pitch that keeps the gripper level. Rack slot poses are
 * computed by solving the IK at each slot, so a card sits in its slot exactly
 * as the gripper would hold it.
 *
 * The parent drives every phase through `motion` (the timeline is the
 * trajectory):
 *  - boot    0 to 1: folded home pose to the first rack slot (loading animation)
 *  - drop    0 = presenting, 1 = at the rack
 *  - from/to/travel: move along the rack between two slots
 *  - grip    0 closed, 1 open
 *  - hold    1 = a card is in the gripper, 0 = gripper empty
 *  - heldSlot: which project's card is (or is about to be) in the gripper
 */

export type ArmMotion = {
  boot: number;
  drop: number;
  from: number;
  to: number;
  travel: number;
  grip: number;
  hold: number;
  heldSlot: number;
};

export type ArmCard = { title: string; category: string; image: string };

const BASE_H = 0.34;
const L1 = 0.72; // upper arm
const L2 = 0.64; // forearm
const L3 = 0.3; // wrist pivot -> fingertip centre

// Screen anchor for the base, in normalized device coords.
const BASE_NDC = new THREE.Vector2(-0.52, -0.78);
// Folded "home" pose the arm boots from (base frame).
const HOME = new THREE.Vector3(0.36, 0.62, 0.12);
// Where a held card is presented: tool point in the base frame.
const PRESENT = new THREE.Vector3(0.78, 1.14, 0.14);

// Physical card: 16:10 screenshot plus a title strip.
const CARD_W = 0.8;
const CARD_H = CARD_W * (820 / 1024);
const CARD_T = 0.008;
const BITE = 0.035; // how far the card edge sits inside the fingers

// The rack: slot i's tool point (the gripped left-edge midpoint), base frame.
const RACK_X0 = 0.5;
const RACK_DX = 0.1;
const RACK_Y = 0.42; // card centre height
const RACK_Z0 = -0.22;
// Later slots stand in front. Slots differ by < 2° of base yaw, so this spacing
// keeps neighbouring cards from intersecting (no z-fighting at their far edges).
const RACK_DZ = 0.055;
const SLOT_TILT = [-3, 2, -1.2, 2.6, -2, 1.2, -2.8, 1.6, -0.8]; // degrees, hand-placed look

const DEG = 180 / Math.PI;
const STRAIGHT_POS = new THREE.Vector3(CARD_W / 2 - BITE, 0, 0);
const IDENTITY_Q = new THREE.Quaternion();

function cssVar(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

type Rig = {
  yaw: THREE.Group;
  shoulder: THREE.Group;
  elbow: THREE.Group;
  wrist: THREE.Group;
  roll: THREE.Group;
  fingerA: THREE.Mesh;
  fingerB: THREE.Mesh;
  tip: THREE.Object3D;
  cableA: THREE.Object3D;
  cableB: THREE.Object3D;
  cableC: THREE.Object3D;
  cableD: THREE.Object3D;
  led: THREE.MeshStandardMaterial;
};

export type ArmProps = {
  motion: RefObject<ArmMotion>;
  hudRef: RefObject<HTMLElement | null>;
  cards: ArmCard[];
  onReady: () => void;
  reduced: boolean;
};

/** Closed-form IK for a level gripper; returns joint angles for a base-frame tool point. */
function solveIK(tool: THREE.Vector3) {
  const yaw = Math.atan2(-tool.z, tool.x);
  const h = Math.hypot(tool.x, tool.z) - L3;
  const v = tool.y - BASE_H;
  const d = THREE.MathUtils.clamp(Math.hypot(h, v), Math.abs(L1 - L2) + 1e-3, L1 + L2 - 1e-3);
  const elbow = -Math.acos(THREE.MathUtils.clamp((d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2), -1, 1));
  const shoulder = Math.atan2(v, h) - Math.atan2(L2 * Math.sin(elbow), L1 + L2 * Math.cos(elbow));
  const wrist = -shoulder - elbow; // level payload
  return { yaw, shoulder, elbow, wrist };
}

const slotTool = (i: number, out = new THREE.Vector3()) =>
  out.set(RACK_X0 + i * RACK_DX, RACK_Y, RACK_Z0 + i * RACK_DZ);

/** Draw a card face: screenshot on top, category / index / title strip below. */
async function drawCardTexture(card: ArmCard, i: number, total: number, dark: boolean) {
  const W = 1024;
  const H = 820;
  const IMG_H = 640;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const bg = dark ? "#131316" : "#ffffff";
  const fg = dark ? "#f2f2ef" : "#16161a";
  const muted = dark ? "#a2a2a9" : "#5f5f66";
  const line = dark ? "rgba(255,255,255,0.14)" : "rgba(17,17,17,0.12)";

  g.fillStyle = bg;
  g.fillRect(0, 0, W, H);

  const img = new Image();
  img.src = card.image;
  await img.decode().catch(() => undefined);
  if (img.naturalWidth) {
    // cover-fit, anchored to the top like the page thumbnails
    const s = Math.max(W / img.naturalWidth, IMG_H / img.naturalHeight);
    const w = img.naturalWidth * s;
    g.drawImage(img, (W - w) / 2, 0, w, img.naturalHeight * s);
  }
  g.fillStyle = line;
  g.fillRect(0, IMG_H, W, 3);

  await document.fonts?.ready;
  g.textBaseline = "alphabetic";
  g.fillStyle = muted;
  g.font = '500 30px "JetBrains Mono Variable", ui-monospace, monospace';
  g.fillText(card.category.toUpperCase(), 44, IMG_H + 62);
  const idx = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  g.fillText(idx, W - 44 - g.measureText(idx).width, IMG_H + 62);
  g.fillStyle = fg;
  g.font = '600 62px "Space Grotesk Variable", system-ui, sans-serif';
  g.fillText(card.title, 44, IMG_H + 142);

  // hairline border
  g.strokeStyle = line;
  g.lineWidth = 4;
  g.strokeRect(2, 2, W - 4, H - 4);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

const shellMat = (
  <meshPhysicalMaterial color="#c7c4ba" roughness={0.48} metalness={0.32} clearcoat={0.15} />
);
const actuatorMat = <meshStandardMaterial color="#1c1c20" roughness={0.45} metalness={0.55} />;
const metalMat = <meshStandardMaterial color="#8a8a90" roughness={0.3} metalness={0.9} />;

/** Recessed bearing caps with visible hex fasteners. */
function Joint({ r, w }: { r: number; w: number }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[r, r, w, 36]} />
        {actuatorMat}
      </mesh>
      <mesh position={[0, w / 2 + 0.004, 0]}>
        <cylinderGeometry args={[r * 0.62, r * 0.62, 0.008, 36]} />
        {metalMat}
      </mesh>
      <mesh position={[0, -w / 2 - 0.004, 0]}>
        <cylinderGeometry args={[r * 0.62, r * 0.62, 0.008, 36]} />
        {metalMat}
      </mesh>
      <mesh position={[0, w / 2 - 0.014, 0]}>
        <cylinderGeometry args={[r + 0.003, r + 0.003, 0.008, 36]} />
        <meshStandardMaterial color="#5c625b" roughness={0.4} metalness={0.7} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 3) * r * 0.78, -w / 2 - 0.008, Math.sin(i * Math.PI / 3) * r * 0.78]}>
          <cylinderGeometry args={[0.008, 0.008, 0.008, 6]} />
          {metalMat}
        </mesh>
      ))}
    </group>
  );
}

/** A tapered link housing along +x. */
function Link({ len, r0, r1 }: { len: number; r0: number; r1: number }) {
  return (
    <group>
      <RoundedBox args={[len - 0.06, r0 * 1.7, r0 * 1.65]} radius={0.025} smoothness={3} position={[len / 2, 0, 0]}>
        {shellMat}
      </RoundedBox>
      <RoundedBox args={[len * 0.64, r1 * 0.8, 0.012]} radius={0.008} smoothness={2} position={[len / 2, 0, r0 * 0.84]}>
        {actuatorMat}
      </RoundedBox>
      {[0.16, 0.84].map((u) => (
        <mesh key={u} position={[len * u, 0, r0 * 0.88]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.013, 0.013, 0.008, 6]} />
          {metalMat}
        </mesh>
      ))}
    </group>
  );
}

function Arm({ motion, hudRef, cards, onReady, reduced }: ArmProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const brand = useMemo(() => cssVar("--brand", "#2f6fed"), [theme]); // eslint-disable-line react-hooks/exhaustive-deps
  const { camera, size } = useThree();
  const root = useRef<THREE.Group>(null);
  const rack = useRef<THREE.Group>(null);
  const rig = useRef<Partial<Rig>>({});
  const cable = useRef<THREE.Mesh>(null);
  const lastSize = useRef("");
  const [texturesReady, setTexturesReady] = useState(false);

  // One physical card per project. Edges/back are plain; the front gets a texture.
  const cardMeshes = useMemo(() => {
    const geo = new THREE.BoxGeometry(CARD_W, CARD_H, CARD_T);
    return cards.map(() => {
      const edge = new THREE.MeshStandardMaterial({ color: "#2a2a2f", roughness: 0.6 });
      const front = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.55,
        emissive: "#ffffff",
        emissiveIntensity: 0.35,
      });
      // BoxGeometry groups: +x, -x, +y, -y, +z (front), -z (back)
      const mesh = new THREE.Mesh(geo, [edge, edge, edge, edge, front, edge]);
      mesh.castShadow = false;
      return mesh;
    });
  }, [cards]);

  // (Re)draw the card faces whenever the theme changes.
  useEffect(() => {
    let cancelled = false;
    Promise.all(cards.map((c, i) => drawCardTexture(c, i, cards.length, dark))).then((texes) => {
      if (cancelled) return texes.forEach((t) => t.dispose());
      texes.forEach((t, i) => {
        const front = (cardMeshes[i].material as THREE.Material[])[4] as THREE.MeshStandardMaterial;
        front.map?.dispose();
        front.map = t;
        front.emissiveMap = t;
        front.needsUpdate = true;
      });
      setTexturesReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [cards, cardMeshes, dark]);

  useEffect(
    () => () => {
      cardMeshes.forEach((m) => {
        (m.material as THREE.Material[]).forEach((mat) => {
          (mat as THREE.MeshStandardMaterial).map?.dispose();
          mat.dispose();
        });
      });
      cardMeshes[0]?.geometry.dispose();
    },
    [cardMeshes],
  );

  const s = useMemo(
    () => ({
      ray: new THREE.Raycaster(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      goal: new THREE.Vector3(),
      atRack: new THREE.Vector3(),
      slotPos: new THREE.Vector3(),
      a: new THREE.Vector3(),
      b: new THREE.Vector3(),
      tipW: new THREE.Vector3(),
      basePt: new THREE.Vector3(),
      // card pose relative to the tip, per slot (includes that slot's tilt)
      holdLocal: [] as THREE.Matrix4[],
      // card pose in the rack (base frame), per slot
      slotLocal: [] as THREE.Matrix4[],
      attached: -1,
      straight: new THREE.Matrix4(),
      tmp: new THREE.Matrix4(),
      tmpQ: new THREE.Quaternion(),
      tmpP: new THREE.Vector3(),
      tmpS: new THREE.Vector3(),
      lastKey: "",
      frame: 0,
      ready: false,
      pts: [0, 1, 2, 3].map(() => new THREE.Vector3()),
    }),
    [],
  );

  const applyPose = (R: Rig, q: ReturnType<typeof solveIK>) => {
    R.yaw.rotation.y = q.yaw;
    R.shoulder.rotation.z = q.shoulder;
    R.elbow.rotation.z = q.elbow;
    R.wrist.rotation.z = q.wrist;
    R.roll.rotation.x = 0;
  };

  /** Pose the rig at every slot once, and record exactly where each card sits. */
  const buildRack = (R: Rig) => {
    const rootInv = new THREE.Matrix4().copy(root.current!.matrixWorld).invert();
    const offset = new THREE.Matrix4().makeTranslation(CARD_W / 2 - BITE, 0, 0);
    s.straight.copy(offset);
    cards.forEach((_, i) => {
      applyPose(R, solveIK(slotTool(i, s.a)));
      root.current!.updateMatrixWorld(true);
      const tilt = new THREE.Matrix4().makeRotationZ((SLOT_TILT[i % SLOT_TILT.length] ?? 0) / DEG);
      s.holdLocal[i] = new THREE.Matrix4().multiplyMatrices(tilt, offset);
      s.slotLocal[i] = new THREE.Matrix4()
        .copy(rootInv)
        .multiply(R.tip.matrixWorld)
        .multiply(s.holdLocal[i]);
    });
    // Put every card in its slot.
    cardMeshes.forEach((m, i) => {
      rack.current!.add(m);
      s.slotLocal[i].decompose(m.position, m.quaternion, m.scale);
    });
    s.attached = -1;
  };

  const placeInRack = (i: number) => {
    const m = cardMeshes[i];
    rack.current!.add(m);
    s.slotLocal[i].decompose(m.position, m.quaternion, m.scale);
  };

  const attachToTip = (R: Rig, i: number) => {
    const m = cardMeshes[i];
    R.tip.add(m);
    s.holdLocal[i].decompose(m.position, m.quaternion, m.scale);
  };

  useFrame(() => {
    const R = rig.current as Rig;
    if (!root.current || !rack.current || !R.yaw) return;

    // Park the base at a fixed screen spot and scale the cell to the viewport.
    const key = `${size.width}x${size.height}`;
    if (lastSize.current !== key) {
      camera.updateMatrixWorld();
      s.ray.setFromCamera(BASE_NDC, camera);
      s.plane.constant = 0;
      if (s.ray.ray.intersectPlane(s.plane, s.basePt))
        root.current.position.set(s.basePt.x, s.basePt.y, -0.25);
      const aspect = size.width / size.height;
      root.current.scale.setScalar(THREE.MathUtils.clamp(aspect / 1.6, 0.78, 1.08));
      root.current.updateMatrixWorld(true);
      lastSize.current = key;
      const held = s.attached;
      buildRack(R);
      if (held >= 0) attachToTip(R, held);
      s.attached = held;
    }

    const m = motion.current;
    const n = cards.length;
    const from = THREE.MathUtils.clamp(Math.round(m.from), 0, n - 1);
    const to = THREE.MathUtils.clamp(Math.round(m.to), 0, n - 1);

    // --- Trajectory: the timeline is the trajectory, no extra damping ------
    s.slotPos.lerpVectors(slotTool(from, s.a), slotTool(to, s.b), m.travel);
    s.slotPos.y += Math.sin(m.travel * Math.PI) * (from === to ? 0 : 0.09);
    // Rack <-> presentation, arcing up so the card clears the rack.
    s.atRack.lerpVectors(PRESENT, s.slotPos, m.drop);
    s.atRack.y += Math.sin(m.drop * Math.PI) * 0.12;
    // Boot: unfold from home toward the rack.
    s.goal.lerpVectors(HOME, s.atRack, m.boot);
    s.goal.y += Math.sin(m.boot * Math.PI) * 0.14;

    const q = solveIK(s.goal);
    applyPose(R, q);

    // Independent grip phase: close fully before lifting the payload.
    const open = 0.024 + m.grip * 0.065;
    R.fingerA.position.z = open;
    R.fingerB.position.z = -open;

    R.led.emissiveIntensity = m.boot < 1 ? 0.6 + Math.sin(s.frame * 0.25) * 0.5 : 0.4;

    // --- Pick / place: re-parent the card between rack and gripper ---------
    const want = m.hold > 0.5 ? Math.round(m.heldSlot) : -1;
    if (want !== s.attached) {
      if (s.attached >= 0) placeInRack(s.attached);
      if (want >= 0) attachToTip(R, want);
      s.attached = want;
    }
    // A held card straightens in the gripper once it's lifted clear.
    if (s.attached >= 0) {
      const lift = reduced ? 1 : THREE.MathUtils.smoothstep(1 - m.drop, 0.15, 0.7);
      s.holdLocal[s.attached].decompose(s.tmpP, s.tmpQ, s.tmpS);
      const card = cardMeshes[s.attached];
      // Pivot about the gripped edge: blend both rotation and position to the straight pose.
      card.position.copy(s.tmpP).lerp(STRAIGHT_POS, lift);
      card.quaternion.copy(s.tmpQ).slerp(IDENTITY_Q, lift);
    }
    root.current.updateWorldMatrix(true, true);

    // --- Cable harness through the joints (only while moving) --------------
    const motionKey = `${m.boot.toFixed(4)}|${m.drop.toFixed(4)}|${m.travel.toFixed(4)}|${from}|${to}`;
    if (cable.current && (s.frame === 0 || motionKey !== s.lastKey)) {
      [R.cableA, R.cableB, R.cableC, R.cableD].forEach((a, i) => {
        a.getWorldPosition(s.pts[i]);
        cable.current!.worldToLocal(s.pts[i]);
      });
      const curve = new THREE.CatmullRomCurve3(s.pts, false, "centripetal");
      const next = new THREE.TubeGeometry(curve, 40, 0.014, 6, false);
      cable.current.geometry.dispose();
      cable.current.geometry = next;
    }
    s.lastKey = motionKey;

    if (!s.ready && texturesReady) {
      s.ready = true;
      onReady();
    }

    // --- Teach-pendant readout (every 4th frame) ---------------------------
    s.frame++;
    const hud = hudRef.current;
    if (hud && s.frame % 4 === 0) {
      const rows = hud.querySelectorAll<HTMLElement>("[data-v]");
      [q.yaw, q.shoulder, q.elbow, q.wrist, 0].forEach((rad, i) => {
        const deg = rad * DEG;
        if (rows[i])
          rows[i].textContent = `${deg >= 0 ? "+" : "−"}${Math.abs(deg).toFixed(1).padStart(5, "0")}°`;
      });
      const tcp = hud.querySelector<HTMLElement>("[data-tcp]");
      if (tcp)
        tcp.textContent = [s.goal.x, s.goal.y, s.goal.z]
          .map((v) => `${Math.round(v * 1000)}`.padStart(4, " "))
          .join("  ");
      const gripLabel = hud.querySelector<HTMLElement>("[data-grip]");
      if (gripLabel) gripLabel.textContent = m.grip > 0.5 ? "OPEN" : "CLOSED";
      const status = hud.querySelector<HTMLElement>("[data-status]");
      if (status)
        status.textContent =
          m.boot < 1
            ? `Calibrating · ${String(Math.round(m.boot * 100)).padStart(3, " ")}%`
            : m.drop > 0.02
              ? "Pick & place · in motion"
              : "Arm online · pick & place";
      hud.dataset.booting = m.boot < 1 ? "true" : "false";
    }
  });

  const set =
    <K extends keyof Rig>(k: K) =>
    (o: Rig[K] | null) => {
      if (o) rig.current[k] = o;
    };

  const rackLen = RACK_X0 + (cards.length - 1) * RACK_DX + CARD_W + 0.1;

  return (
    <>
      <group ref={root}>
        {/* Bolted mounting plate and a single restrained status indicator. */}
        <RoundedBox args={[0.46, 0.055, 0.4]} radius={0.025} smoothness={3} position={[0, 0.025, 0]}>
          {actuatorMat}
        </RoundedBox>
        {[-1, 1].flatMap((x) => [-1, 1].map((z) => (
          <mesh key={`${x}:${z}`} position={[x * 0.18, 0.058, z * 0.15]}>
            <cylinderGeometry args={[0.023, 0.023, 0.012, 6]} />
            {metalMat}
          </mesh>
        )))}
        <mesh position={[0, 0.11, 0.151]}>
          <boxGeometry args={[0.035, 0.009, 0.006]} />
          <meshStandardMaterial ref={set("led")} color={brand} emissive={brand} />
        </mesh>

        <group ref={set("yaw")}>
          {/* Turret */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.13, 0.16, 0.22, 48]} />
            {shellMat}
          </mesh>
          <object3D ref={set("cableA")} position={[-0.12, 0.2, -0.14]} />

          <group ref={set("shoulder")} position={[0, BASE_H, 0]}>
            <Joint r={0.115} w={0.3} />
            <Link len={L1} r0={0.085} r1={0.064} />
            <object3D ref={set("cableB")} position={[L1 * 0.5, 0.06, -0.09]} />

            <group ref={set("elbow")} position={[L1, 0, 0]}>
              <Joint r={0.09} w={0.24} />
              <Link len={L2} r0={0.062} r1={0.046} />
              <object3D ref={set("cableC")} position={[L2 * 0.55, 0.05, -0.07]} />

              <group ref={set("wrist")} position={[L2, 0, 0]}>
                <Joint r={0.066} w={0.17} />
                <object3D ref={set("cableD")} position={[0.02, 0.05, -0.06]} />
                <mesh position={[0.07, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
                  <cylinderGeometry args={[0.048, 0.056, 0.1, 32]} />
                  {shellMat}
                </mesh>

                <group ref={set("roll")} position={[0.12, 0, 0]}>
                  {/* Tool flange + gripper */}
                  <mesh rotation={[0, 0, -Math.PI / 2]}>
                    <cylinderGeometry args={[0.058, 0.058, 0.02, 32]} />
                    {metalMat}
                  </mesh>
                  <mesh position={[0.045, 0, 0]}>
                    <boxGeometry args={[0.07, 0.1, 0.12]} />
                    {actuatorMat}
                  </mesh>
                  <mesh ref={set("fingerA")} position={[0.12, 0, 0.024]}>
                    <boxGeometry args={[0.1, 0.075, 0.014]} />
                    {shellMat}
                  </mesh>
                  <mesh ref={set("fingerB")} position={[0.12, 0, -0.024]}>
                    <boxGeometry args={[0.1, 0.075, 0.014]} />
                    {shellMat}
                  </mesh>
                  <object3D ref={set("tip")} position={[L3 - 0.14, 0, 0]} />
                </group>
              </group>
            </group>
          </group>
        </group>
        {/* Card rack: a low ledge the cards stand on */}
        <RoundedBox
          args={[rackLen - RACK_X0 + 0.2, 0.035, (cards.length - 1) * RACK_DZ + 0.16]}
          radius={0.012}
          smoothness={2}
          position={[(RACK_X0 + rackLen) / 2 - 0.02, RACK_Y - CARD_H / 2 - 0.02, RACK_Z0 + ((cards.length - 1) * RACK_DZ) / 2]}
        >
          {actuatorMat}
        </RoundedBox>
        <group ref={rack} />

        <ContactShadows
          position={[0, 0.001, 0]}
          scale={1.4}
          blur={2}
          far={0.6}
          opacity={theme === "dark" ? 0.8 : 0.4}
          resolution={256}
        />
      </group>

      {/* Cable harness (geometry updated only while the trajectory changes) */}
      <mesh ref={cable}>
        <bufferGeometry />
        <meshStandardMaterial color="#141417" roughness={0.6} />
      </mesh>

      {/* Studio lighting from local light-formers (no HDR download) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 4, 2]} scale={[6, 2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer intensity={1.2} position={[-4, 1.5, 1]} scale={[3, 3, 1]} rotation-y={Math.PI / 2} />
        <Lightformer intensity={0.8} position={[4, 1, -2]} scale={[3, 2, 1]} rotation-y={-Math.PI / 2} />
      </Environment>
    </>
  );
}

export default function RobotArm({ active, ...rest }: ArmProps & { active: boolean }) {
  const [dpr] = useState(() => Math.min(window.devicePixelRatio, 2));
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0.9, 1.25, 3.6], fov: 34 }}
      onCreated={({ camera }) => camera.lookAt(0.35, 0.3, 0)}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} />
      <Arm {...rest} />
    </Canvas>
  );
}
