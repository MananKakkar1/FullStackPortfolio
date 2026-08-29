import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { navLinks, profile } from "../constants";
import { List, X } from "../lib/icons";
import ThemeToggle from "./ThemeToggle";

const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  // Condensed / scroll-edge state, written straight to the DOM (no re-render).
  useLenis((lenis) => {
    headerRef.current?.setAttribute("data-scrolled", String(lenis.scroll > 8));
  });

  // Scroll-spy for wayfinding. Rare state changes, so useState is fine here.
  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  const goTo = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    const target = document.getElementById(id);
    if (target && lenis) lenis.scrollTo(target, { offset: -64 });
    else target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className="scroll-edge material-chrome fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] transition-[background-color] duration-300"
    >
      <nav className="shell-wide flex h-full items-center justify-between">
        <button
          type="button"
          onClick={() => goTo("#top")}
          className="font-display text-[0.95rem] font-medium tracking-tight text-ink"
        >
          {profile.name}
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <button
                key={link.href}
                type="button"
                onClick={() => goTo(link.href)}
                aria-current={active === id ? "true" : undefined}
                className={`link-underline text-sm transition-colors ${
                  active === id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="pressable grid size-9 place-items-center rounded-full border border-border text-ink"
          >
            {open ? <X size={16} weight="bold" /> : <List size={16} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg md:hidden">
          <div className="shell flex flex-col py-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => goTo(link.href)}
                className="py-3 text-left font-display text-2xl font-medium text-ink"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
