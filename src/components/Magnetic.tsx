import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "../lib/scroll";
import { useHasHover, usePrefersReducedMotion } from "../lib/hooks";

const MAX = 8; // px. A hint toward the cursor, not a drag

/**
 * Subtle magnetic pull toward the pointer for a wrapped interactive element.
 * Fine-pointer + motion-allowed only. Displacement is clamped so it stays a
 * hint (Apple: telegraph direction, don't overshoot).
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasHover = useHasHover();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasHover && !reducedMotion;

  useGSAP(
    () => {
      const el = ref.current;
      if (!enabled || !el) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(clamp((e.clientX - (r.left + r.width / 2)) * strength));
        yTo(clamp((e.clientY - (r.top + r.height / 2)) * strength));
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [enabled, strength] },
  );

  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </span>
  );
}
