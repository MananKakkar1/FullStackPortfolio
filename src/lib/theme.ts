import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document !== "undefined") {
    const current = document.documentElement.dataset.theme;
    if (current === "light" || current === "dark") return current;
  }
  return "light";
}

// The <html data-theme> attribute is the store; every subscriber (toggle,
// toaster, 3D scene) reads the same value.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => obs.disconnect();
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* storage unavailable; the attribute still drives the UI */
  }
}

/**
 * Theme is applied pre-paint by an inline script in index.html.
 * This hook keeps React in sync and lets the user override + persist.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as Theme);
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return { theme, setTheme, toggle };
}
