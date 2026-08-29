import { useTheme } from "../lib/theme";
import { Sun, Moon } from "../lib/icons";

/** Sun/Moon toggle. The two glyphs crossfade + scale, they do not flip. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="pressable grid size-9 place-items-center rounded-full border border-border text-ink/80 hover:border-border-strong hover:text-ink"
    >
      <span className="relative block size-4">
        <Sun
          size={16}
          weight="bold"
          className="absolute inset-0 transition-[opacity,transform] duration-300"
          style={{
            transitionTimingFunction: ease,
            opacity: isDark ? 0 : 1,
            transform: isDark ? "scale(0.5) rotate(-45deg)" : "none",
          }}
        />
        <Moon
          size={16}
          weight="bold"
          className="absolute inset-0 transition-[opacity,transform] duration-300"
          style={{
            transitionTimingFunction: ease,
            opacity: isDark ? 1 : 0,
            transform: isDark ? "none" : "scale(0.5) rotate(45deg)",
          }}
        />
      </span>
    </button>
  );
}
