import { useEffect } from "react";

/**
 * Scroll reveal without a wrapper component: mark elements with
 * `data-reveal` (and optionally `style={{ "--reveal-delay": "80ms" }}`), then
 * call this once per page. The visual lives in the [data-reveal] rules in
 * index.css, which no-op under prefers-reduced-motion.
 */
export function useRevealObserver(key?: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

/** Inline style for a staggered reveal. */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;
