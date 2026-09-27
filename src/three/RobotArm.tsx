import { useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

/**
 * A procedural industrial arm (built from primitives, no model files) that
 * picks project cards out of a fanned pile and presents them. The HTML card
 * and front clamp are pinned to the tool coordinate every frame, completing
 * the WebGL/DOM depth sandwich.
 *
 * Kinematics: base yaw + shoulder/elbow via closed-form two-link IK (law of
 * cosines) + a wrist pitch that keeps the gripper level.
 *
 * Targets come from the DOM: `presentRef` marks where a held card is shown,
 * and each `[data-pile-slot]` inside `pileRef` marks a pile slot's anchor (the
 * left-centre of that card). Screen anchors are ray-cast into the scene, so
 * the layout is CSS-driven and the arm adapts to any viewport.
 *
 * The parent drives every phase through `motion` (the timeline is the
 * trajectory):
 *  - boot    0 to 1: folded home pose to the first pile slot (loading animation)
 *  - drop    0 = presenting, 1 = at the pile
 *  - from/to/travel: move along the pile between two slots
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

const BASE_H = 0.34;
const L1 = 0.72; // upper arm
const L2 = 0.64; // forearm
const L3 = 0.3; // wrist pivot -> fingertip centre

// Screen anchor for the base, in normalized device coords.
const BASE_NDC = new THREE.Vector2(-0.52, -0.78);
// Folded "home" pose the arm boots from (base frame).
const HOME = new THREE.Vector3(0.36, 0.62, 0.12);
// Depth (world z offset from the base) of the planes DOM anchors are cast onto.
const PRESENT_DEPTH = 0.32;
const PILE_DEPTH = 0.55;
// Card scale while presented vs. lying in the pile.
export const PRESENT_SCALE = 0.86;
export const SLOT_SCALE = 0.4;
// Tip marker sits this far short of the IK tool point along the gripper.
const TIP_LEAD = 0.02;

const DEG = 180 / Math.PI;

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
  cardRef: RefObject<HTMLElement | null>;
  hudRef: RefObject<HTMLElement | null>;
  presentRef: RefObject<HTMLElement | null>;
  pileRef: RefObject<HTMLElement | null>;
  onReady: () => void;
  reduced: boolean;
};

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

function Arm({ motion, cardRef, hudRef, presentRef, pileRef, onReady }: ArmProps) {
  const { theme } = useTheme();
  const brand = useMemo(() => cssVar("--brand", "#2f6fed"), [theme]); // eslint-disable-line react-hooks/exhaustive-deps
  const { camera, size, gl } = useThree();
  const root = useRef<THREE.Group>(null);
  const rig = useRef<Partial<Rig>>({});
  const cable = useRef<THREE.Mesh>(null);
  const lastSize = useRef("");

  const s = useMemo(
    () => ({
      ray: new THREE.Raycaster(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      ndc: new THREE.Vector2(),
      goal: new THREE.Vector3(),
      atPile: new THREE.Vector3(),
      slotPos: new THREE.Vector3(),
      tool: new THREE.Vector3(),
      tipW: new THREE.Vector3(),
      tipNdc: new THREE.Vector3(),
      basePt: new THREE.Vector3(),
      present: new THREE.Vector3(0.9, 0.9, 0.3),
      slots: [] as THREE.Vector3[],
      // Slot anchors in stage pixels, so the held card can land exactly on its slot.
      slotPx: [] as { x: number; y: number }[],
      slotRot: [] as number[],
      slotEls: [] as HTMLElement[],
      lastKey: "",
      frame: 0,
      ready: false,
      pts: [0, 1, 2, 3].map(() => new THREE.Vector3()),
    }),
    [],
  );

  /** Cast a DOM point (client px) onto a z-plane in front of the base; return base-local coords. */
  const castLocal = (cx: number, cy: number, depth: number, out: THREE.Vector3) => {
    const r = gl.domElement.getBoundingClientRect();
    s.ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    s.ray.setFromCamera(s.ndc, camera);
    s.plane.constant = -(root.current!.position.z + depth);
    if (!s.ray.ray.intersectPlane(s.plane, out)) return out;
    root.current!.worldToLocal(out);
    // Nudge forward so the tip marker (not the IK point) lands on the anchor.
    const h = Math.hypot(out.x, out.z) || 1;
    out.x += (out.x / h) * TIP_LEAD;
    out.z += (out.z / h) * TIP_LEAD;
    return out;
  };

  /** Re-read the DOM anchors (present slot + pile slots). Cheap; done on layout changes. */
  const readAnchors = () => {
    const p = presentRef.current?.getBoundingClientRect();
    if (p) castLocal(p.left, p.top, PRESENT_DEPTH, s.present);
    // NB: not [data-slot] — every shadcn component sets data-slot too.
    s.slotEls = Array.from(pileRef.current?.querySelectorAll<HTMLElement>("[data-pile-slot]") ?? []);
    const stage = gl.domElement.getBoundingClientRect();
    s.slotEls.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      s.slots[i] ??= new THREE.Vector3();
      castLocal(r.left, r.top, PILE_DEPTH, s.slots[i]);
      s.slotPx[i] = { x: r.left - stage.left, y: r.top - stage.top };
      s.slotRot[i] = Number(el.dataset.rot ?? 0);
    });
  };

  useFrame(() => {
    const R = rig.current as Rig;
    if (!root.current || !R.yaw) return;

    // Park the base at a fixed screen spot; recomputed on resize.
    const key = `${size.width}x${size.height}`;
    if (lastSize.current !== key) {
      camera.updateMatrixWorld();
      s.ray.setFromCamera(BASE_NDC, camera);
      s.plane.constant = 0;
      if (s.ray.ray.intersectPlane(s.plane, s.basePt))
        root.current.position.set(s.basePt.x, s.basePt.y, -0.25);
      root.current.updateMatrixWorld();
      lastSize.current = key;
      readAnchors();
    } else if (s.frame % 30 === 0) {
      root.current.updateMatrixWorld();
      readAnchors(); // fonts / images settling can shift the layout
    }
    if (!s.slots.length) return;

    const m = motion.current;
    const n = s.slots.length;
    const from = THREE.MathUtils.clamp(Math.round(m.from), 0, n - 1);
    const to = THREE.MathUtils.clamp(Math.round(m.to), 0, n - 1);

    // --- Trajectory: the timeline is the trajectory, no extra damping ------
    // Along the pile: slot to slot with a small hop.
    s.slotPos.lerpVectors(s.slots[from], s.slots[to], m.travel);
    s.slotPos.y += Math.sin(m.travel * Math.PI) * (from === to ? 0 : 0.07);
    // Pile <-> presentation, arcing up so the card clears the pile.
    s.atPile.lerpVectors(s.present, s.slotPos, m.drop);
    s.atPile.y += Math.sin(m.drop * Math.PI) * 0.1;
    // Boot: unfold from home toward the pile.
    s.goal.lerpVectors(HOME, s.atPile, m.boot);
    s.goal.y += Math.sin(m.boot * Math.PI) * 0.14;
    s.tool.copy(s.goal);

    // --- IK (base frame, shoulder at y = BASE_H) ---------------------------
    const yaw = Math.atan2(-s.tool.z, s.tool.x);
    const h = Math.hypot(s.tool.x, s.tool.z) - L3; // gripper stays level
    const v = s.tool.y - BASE_H;
    const d = THREE.MathUtils.clamp(Math.hypot(h, v), Math.abs(L1 - L2) + 1e-3, L1 + L2 - 1e-3);
    const elbow = -Math.acos(
      THREE.MathUtils.clamp((d * d - L1 * L1 - L2 * L2) / (2 * L1 * L2), -1, 1),
    );
    const shoulder =
      Math.atan2(v, h) - Math.atan2(L2 * Math.sin(elbow), L1 + L2 * Math.cos(elbow));
    const wrist = -shoulder - elbow; // maintain a rigid, level payload
    const roll = 0;

    R.yaw.rotation.y = yaw;
    R.shoulder.rotation.z = shoulder;
    R.elbow.rotation.z = elbow;
    R.wrist.rotation.z = wrist;
    R.roll.rotation.x = roll;

    // Independent grip phase: close fully before lifting the payload.
    const open = 0.024 + m.grip * 0.065;
    R.fingerA.position.z = open;
    R.fingerB.position.z = -open;

    // Status LED breathes while calibrating, then settles.
    R.led.emissiveIntensity = m.boot < 1 ? 0.6 + Math.sin(s.frame * 0.25) * 0.5 : 0.4;
    root.current.updateWorldMatrix(true, true);

    // --- Cable harness through the joints (only while moving) --------------
    const motionKey = `${m.boot.toFixed(4)}|${m.drop.toFixed(4)}|${m.travel.toFixed(4)}|${from}|${to}`;
    if (cable.current && (s.frame === 0 || motionKey !== s.lastKey)) {
      const anchors = [R.cableA, R.cableB, R.cableC, R.cableD];
      anchors.forEach((a, i) => {
        a.getWorldPosition(s.pts[i]);
        cable.current!.worldToLocal(s.pts[i]);
      });
      const curve = new THREE.CatmullRomCurve3(s.pts, false, "centripetal");
      const next = new THREE.TubeGeometry(curve, 40, 0.014, 6, false);
      cable.current.geometry.dispose();
      cable.current.geometry = next;
    }
    s.lastKey = motionKey;

    // --- Pin the HTML card to the fingertips -------------------------------
    R.tip.getWorldPosition(s.tipW);
    s.tipNdc.copy(s.tipW).project(camera);
    const tipX = ((s.tipNdc.x + 1) / 2) * size.width;
    const tipY = ((1 - s.tipNdc.y) / 2) * size.height;
    // Scale/rotation blend from presented to exactly matching the target slot.
    const pileAmt = m.boot < 1 ? 1 : m.drop;
    // At the pile, snap to the slot's measured anchor (not the IK estimate) so
    // the pile card and the gripped card coincide to the pixel at handoff.
    const pa = s.slotPx[from];
    const pb = s.slotPx[to];
    const anchorX = pa && pb ? THREE.MathUtils.lerp(pa.x, pb.x, m.travel) : tipX;
    const anchorY = pa && pb ? THREE.MathUtils.lerp(pa.y, pb.y, m.travel) : tipY;
    const snap = pileAmt * pileAmt * pileAmt; // only matters right at the pile
    const x = THREE.MathUtils.lerp(tipX, anchorX, snap);
    const y = THREE.MathUtils.lerp(tipY, anchorY, snap);
    const slotRot = THREE.MathUtils.lerp(s.slotRot[from] ?? 0, s.slotRot[to] ?? 0, m.travel);
    const sc = THREE.MathUtils.lerp(PRESENT_SCALE, SLOT_SCALE, pileAmt);
    const rot = slotRot * pileAmt;
    const card = cardRef.current;
    if (card) {
      // A DOM front jaw completes the depth sandwich: rear jaw / card / front jaw.
      // Both layers use this exact TCP.
      card.style.opacity = m.hold > 0.5 ? "1" : "0";
      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translateY(-50%) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      const jaw = card.querySelector<HTMLElement>("[data-jaw]");
      const seat = card.querySelector<HTMLElement>("[data-seat]");
      // The clamp is hardware: counter-scale so it stays gripper-sized.
      if (jaw) jaw.style.transform = `translateX(${((-m.grip * 22) / sc).toFixed(2)}px) scale(${(1 / sc).toFixed(4)})`;
      if (seat) seat.style.transform = `scale(${(1 / sc).toFixed(4)})`;
      card.style.pointerEvents = m.drop > 0.01 || m.hold < 1 ? "none" : "auto";
      // Down at the pile the card sits in its slot's layer (neighbours overlap it);
      // it only rises above the pile once it's lifted clear.
      const layer = Math.round(THREE.MathUtils.lerp(from, to, m.travel));
      card.style.zIndex = pileAmt > 0.82 ? String(layer) : "20";
    }
    // Pile: the held card's slot is empty while it's in the gripper.
    const held = Math.round(m.heldSlot);
    s.slotEls.forEach((el, i) => {
      el.dataset.empty = i === held && m.hold > 0.5 ? "true" : "false";
    });

    if (!s.ready) {
      s.ready = true;
      onReady();
    }

    // --- Teach-pendant readout (every 4th frame) ---------------------------
    s.frame++;
    const hud = hudRef.current;
    if (hud && s.frame % 4 === 0) {
      const rows = hud.querySelectorAll<HTMLElement>("[data-v]");
      [yaw, shoulder, elbow, wrist, roll].forEach((rad, i) => {
        const deg = rad * DEG;
        if (rows[i])
          rows[i].textContent = `${deg >= 0 ? "+" : "−"}${Math.abs(deg).toFixed(1).padStart(5, "0")}°`;
      });
      const tcp = hud.querySelector<HTMLElement>("[data-tcp]");
      if (tcp)
        tcp.textContent = [s.tool.x, s.tool.y, s.tool.z]
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
