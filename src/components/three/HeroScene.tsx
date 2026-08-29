import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { usePrefersReducedMotion } from "../../lib/hooks";

/**
 * A single restrained 3D accent: a slowly drifting wireframe polyhedron that
 * parallaxes to the pointer. Monochrome, low contrast, decorative only.
 * Freezes under prefers-reduced-motion.
 */

function readAccentColor(): string {
  if (typeof window === "undefined") return "#888888";
  const v = getComputedStyle(document.documentElement).getPropertyValue("--muted");
  return v.trim() || "#888888";
}

function Shape({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const inner = useRef<Mesh>(null);
  const { pointer } = useThree();
  const [color, setColor] = useState(readAccentColor);

  useEffect(() => {
    const obs = new MutationObserver(() => setColor(readAccentColor()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  useFrame((_, delta) => {
    if (!group.current || !inner.current) return;
    const d = Math.min(delta, 0.05);
    if (reduced) return;
    inner.current.rotation.y += d * 0.16;
    inner.current.rotation.x += d * 0.045;
    const targetX = pointer.y * 0.16;
    const targetY = pointer.x * 0.26;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <Shape reduced={reduced} />
    </Canvas>
  );
}
