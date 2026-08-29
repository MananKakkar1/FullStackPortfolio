import { useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * Thin reading-progress bar under the nav. Wayfinding on long pages.
 * Writes transform directly on scroll, no React re-render per frame.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis((lenis) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${lenis.progress || 0})`;
    }
  });

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-[var(--nav-h)] z-40 h-px bg-border"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
