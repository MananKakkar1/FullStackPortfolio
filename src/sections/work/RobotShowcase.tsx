import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import { projects } from "@/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDown } from "@/lib/icons";
import type { ArmCard, ArmMotion } from "@/three/RobotArm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const RobotArm = lazy(() => import("@/three/RobotArm"));

const STEP_VH = 70; // scroll distance per project
const JOINTS = ["J1", "J2", "J3", "J4", "J5"];

/**
 * Desktop Work section: a robot workcell. Every project is a physical 3D
 * card standing in a fanned rack; a procedural arm picks the active one out
 * and presents it. Scrolling to another project plays a real pick-and-place:
 * the arm returns the current card to its slot, travels along the rack, grips
 * the target card, and lifts it out. The first pick doubles as the loading
 * animation (the arm unfolds from its home pose while "calibrating"). The
 * readable details and the link live in a static shadcn Card beside it.
 */
export default function RobotShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const motion = useRef<ArmMotion>({
    boot: 0,
    drop: 1,
    from: 0,
    to: 0,
    travel: 0,
    grip: 1,
    hold: 0,
    heldSlot: 0,
  });
  const wanted = useRef(0);
  const shownRef = useRef(0);
  const swap = useRef<gsap.core.Timeline | null>(null);
  const bootStarted = useRef(false);
  const [active, setActive] = useState(0); // where the scroll is
  const [shown, setShown] = useState(0); // what the arm is holding
  const [onScreen, setOnScreen] = useState(false);
  const [ready, setReady] = useState(false); // arm rendered its first frame
  const [booted, setBooted] = useState(false); // first pick finished
  const [settled, setSettled] = useState(0); // bumps when a swap finishes
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();
  const project = projects[shown];
  const cards = useMemo<ArmCard[]>(
    () => projects.map((p) => ({ title: p.title, category: p.category, image: p.thumb ?? p.image })),
    [],
  );
  shownRef.current = shown;

  useGSAP(
    () => {
      trigger.current = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const i = Math.min(projects.length - 1, Math.floor(self.progress * projects.length));
          setActive((prev) => (prev === i ? prev : i));
        },
      });
    },
    { scope: wrap },
  );

  // Boot: once the arm is on screen, unfold from home, reach into the pile,
  // and pick the first card. This is the loading animation.
  useEffect(() => {
    if (!ready || bootStarted.current) return;
    bootStarted.current = true;
    const m = motion.current;
    const first = wanted.current;
    Object.assign(m, { from: first, to: first, travel: 0, heldSlot: first });
    setShown(first);
    if (reduced) {
      Object.assign(m, { boot: 1, drop: 0, grip: 0, hold: 1 });
      setBooted(true);
      return;
    }
    swap.current = gsap
      .timeline({
        onComplete: () => {
          setBooted(true);
          setSettled((n) => n + 1);
        },
      })
      .to(m, { boot: 1, duration: 1.6, ease: "power3.inOut" })
      .to(m, { grip: 0, duration: 0.2, ease: "power2.out" })
      .set(m, { hold: 1 })
      .to(m, { drop: 0, duration: 0.9, ease: "power2.inOut" });
  }, [ready, reduced]);

  // Pick-and-place whenever the scroll lands on a different project.
  useEffect(() => {
    wanted.current = active;
    if (!booted) return;
    if (active === shown && !swap.current?.isActive()) return;
    const m = motion.current;
    if (reduced) {
      swap.current?.kill();
      Object.assign(m, { drop: 0, grip: 0, hold: 1, travel: 0, from: active, to: active, heldSlot: active });
      setShown(active);
      return;
    }
    if (swap.current?.isActive()) return; // the running swap re-checks `wanted` when it settles
    const old = shownRef.current;
    let target = old;
    swap.current = gsap
      .timeline({ onComplete: () => setSettled((n) => n + 1) })
      .set(m, { from: old, to: old, travel: 0, heldSlot: old })
      // 1. Lower the current card back into its own slot and let go.
      .to(m, { drop: 1, duration: 0.7, ease: "power2.inOut" })
      .to(m, { grip: 1, duration: 0.18, ease: "power2.out" })
      .set(m, { hold: 0 })
      // 2. Travel along the pile to the target card.
      .call(() => {
        target = wanted.current;
        m.to = target;
      })
      .to(m, { travel: 1, duration: 0.5, ease: "power2.inOut" })
      .call(() => {
        Object.assign(m, { from: target, to: target, travel: 0, heldSlot: target });
        setShown(target);
      })
      // 3. Grip it and lift it out of the pile.
      .to(m, { grip: 0, duration: 0.18, ease: "power2.out" })
      .set(m, { hold: 1 })
      .to(m, { drop: 0, duration: 0.85, ease: "power2.inOut" });
    // `settled` re-runs this after a swap, in case the scroll moved on meanwhile.
  }, [active, shown, reduced, settled, booted]);

  useEffect(() => () => void swap.current?.kill(), []);

  // Only mount + render the canvas while the stage is near the viewport.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ←/→ step through projects while the stage is pinned.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!trigger.current?.isActive || e.altKey || e.metaKey || e.ctrlKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, [contenteditable]")) return;
      const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      jumpToRef.current(Math.max(0, Math.min(projects.length - 1, active + dir)));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const jumpTo = (i: number) => {
    const st = trigger.current;
    if (!st) return setActive(i);
    const y = st.start + ((i + 0.5) / projects.length) * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { immediate: reduced });
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  };
  const jumpToRef = useRef(jumpTo);
  jumpToRef.current = jumpTo;

  return (
    <div
      ref={wrap}
      className="relative mt-[var(--space-block)]"
      style={{ height: `calc(${projects.length * STEP_VH}vh + 100svh)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* 3D stage */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {onScreen && (
            <Suspense fallback={null}>
              <RobotArm
                motion={motion}
                hudRef={hudRef}
                cards={cards}
                onReady={() => setReady(true)}
                reduced={reduced}
                active={onScreen}
              />
            </Suspense>
          )}
        </div>

        {/* Loading: shown until the arm renders its first frame */}
        {!ready && (
          <div
            role="status"
            className="absolute bottom-[26%] left-[14%] z-30 flex items-center gap-2.5 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase"
          >
            <Spinner className="size-4 text-brand" />
            Loading robot…
          </div>
        )}

        {/* Teach-pendant readout */}
        <div
          ref={hudRef}
          aria-hidden
          data-booting="true"
          className="group shell-wide pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+1.5rem)] z-30 font-mono text-[0.7rem] leading-relaxed text-faint"
        >
          <div className="w-fit">
            <p className="mb-2 flex items-center gap-2 tracking-[0.14em] uppercase">
              <span className="size-1.5 rounded-full bg-brand group-data-[booting=true]:animate-pulse" />
              <span data-status className="whitespace-pre">
                {ready ? "Calibrating ·   0%" : "Initializing"}
              </span>
            </p>
            {JOINTS.map((j) => (
              <p key={j} className="flex gap-4 tabular-nums">
                <span>{j}</span>
                <span data-v className="text-muted-foreground">
                  +000.0°
                </span>
              </p>
            ))}
            <p className="mt-2 flex gap-4 tabular-nums">
              <span>TCP</span>
              <span data-tcp className="whitespace-pre text-muted-foreground" />
              <span className="text-faint">mm</span>
            </p>
            <p className="flex gap-4">
              <span>GRIP</span>
              <span data-grip className="text-muted-foreground">
                OPEN
              </span>
            </p>
          </div>
        </div>

        {/* The presented project, readable and clickable (static; the 3D card is the visual) */}
        <div className="shell-wide pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+7.5rem)] z-30 flex justify-end">
          <Card
            key={project.id}
            className={cn(
              "pointer-events-auto w-[21rem] gap-4 shadow-soft transition-opacity duration-300 animate-in fade-in-0 slide-in-from-right-2 xl:w-[23rem]",
              !booted && "opacity-0",
            )}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Badge variant="outline" className="font-mono font-normal text-muted-foreground">
                  {project.category}
                </Badge>
                <span className="type-meta">
                  {String(shown + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <CardTitle className="type-display-m">{project.title}</CardTitle>
              <CardDescription className="text-sm">{project.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((t) => (
                  <li key={t}>
                    <Badge variant="secondary" className="font-mono font-normal">
                      {t}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="group h-10 rounded-lg px-4">
                <Link to={`/work/${project.id}`}>
                  View project
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Project index */}
        <nav
          aria-label="Projects"
          className="shell-wide absolute inset-x-0 top-[calc(var(--nav-h)+1.25rem)] z-30 flex flex-col items-end gap-2"
        >
          <ol className="flex items-center gap-1">
            {projects.map((p, i) => (
              <li key={p.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => jumpTo(i)}
                      aria-current={i === active ? "true" : undefined}
                      aria-label={p.title}
                      className={cn(
                        "gap-2 px-2.5 font-normal",
                        i === active ? "bg-accent text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                      {i === active && <span>{p.title}</span>}
                    </Button>
                  </TooltipTrigger>
                  {i !== active && <TooltipContent side="bottom">{p.title}</TooltipContent>}
                </Tooltip>
              </li>
            ))}
          </ol>
          <p className="type-meta flex items-center gap-1.5 whitespace-nowrap">
            <ArrowDown size={12} weight="bold" />
            Scroll or press <Kbd>←</Kbd>
            <Kbd>→</Kbd> to swap projects
          </p>
        </nav>
      </div>
    </div>
  );
}
