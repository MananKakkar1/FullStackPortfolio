import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Single place the plugins are registered so every section imports from here.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

type MMCallback = (ctx: gsap.Context) => void;

/**
 * Branch scroll choreography on prefers-reduced-motion. Call inside a `useGSAP`
 * callback: the surrounding context reverts the matchMedia on cleanup.
 * `full` gets the rich version; `reduced` is where you set final resting states.
 */
export function withMotion(full: MMCallback, reduced?: MMCallback) {
  gsap.matchMedia().add(
    {
      isFull: "(prefers-reduced-motion: no-preference)",
      isReduced: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const c = ctx.conditions as { isFull: boolean; isReduced: boolean };
      if (c.isFull) full(ctx);
      else reduced?.(ctx);
    },
  );
}
