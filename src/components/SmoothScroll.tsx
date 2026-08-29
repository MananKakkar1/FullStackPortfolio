import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "../lib/scroll";
import { usePrefersReducedMotion } from "../lib/hooks";

/**
 * App-wide smooth scroll (Lenis) driven by GSAP's ticker and bridged to
 * ScrollTrigger. Under prefers-reduced-motion the instance is configured as a
 * near-passthrough (instant lerp, no wheel smoothing) so scroll stays native
 * without changing hook order.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: reduced ? 0 : 1.05,
        lerp: reduced ? 1 : 0.12,
        smoothWheel: !reduced,
        syncTouch: false,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
