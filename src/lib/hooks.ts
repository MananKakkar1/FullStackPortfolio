import { useEffect, useState } from "react";

/** Tracks a media query; SSR-safe-ish and updates on change. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/** Fine pointer + real hover. Gate hover-only affordances behind this. */
export const useHasHover = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");
