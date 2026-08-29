import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger offset in ms; applied via --reveal-delay. */
  delay?: number;
  className?: string;
};

/**
 * Fades + lifts its child into place once, when it enters the viewport.
 * Uses IntersectionObserver (never a scroll listener). The visual is defined
 * by the [data-reveal] rules in index.css, which also no-op under
 * prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      "data-reveal": "",
      className,
      style: delay
        ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
        : undefined,
    },
    children,
  );
}
