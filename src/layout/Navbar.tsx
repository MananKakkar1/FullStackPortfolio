import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { navLinks, profile } from "@/constants";
import { List, Moon, Sun } from "@/lib/icons";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const { theme, toggle } = useTheme();

  const themeButton = (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded-full bg-transparent shadow-none dark:bg-transparent"
    >
      {theme === "dark" ? <Moon size={16} weight="bold" /> : <Sun size={16} weight="bold" />}
    </Button>
  );

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

  // Lenis ignores the Sheet's scroll lock, so pause it while the sheet is open.
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
        <Button
          variant="ghost"
          onClick={() => goTo("#top")}
          className="-ml-3 font-display text-[0.95rem] font-medium tracking-tight hover:bg-transparent dark:hover:bg-transparent"
        >
          {profile.name}
        </Button>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                onClick={() => goTo(link.href)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "font-normal",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Button>
            );
          })}
          <div className="ml-3">
            {themeButton}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {themeButton}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="rounded-full bg-transparent shadow-none dark:bg-transparent"
              >
                <List size={16} weight="bold" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-4/5">
              <SheetHeader>
                <SheetTitle className="font-display text-base font-medium">
                  {profile.name}
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col px-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    onClick={() => goTo(link.href)}
                    className="h-auto justify-start py-3 font-display text-2xl font-medium"
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
