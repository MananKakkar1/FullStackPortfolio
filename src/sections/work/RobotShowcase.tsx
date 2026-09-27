import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import { projects } from "@/constants";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDown } from "@/lib/icons";
import type { ArmMotion } from "@/three/RobotArm";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const RobotArm = lazy(() => import("@/three/RobotArm"));

const STEP_VH = 70; // scroll distance per project
const JOINTS = ["J1", "J2", "J3", "J4", "J5"];

/**
 * Desktop Work section. A sticky stage where a procedural robot arm carries
 * the active project card. Scrolling to the next project plays a
 * pick-and-place: the arm sets the current card down out of frame, the
 * content swaps at the bottom of the swing, and it lifts the next one up.
 */
export default function RobotShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const motion = useRef<ArmMotion>({ drop: 0, grip: 0, exchange: 0 });
  const wanted = useRef(0);
  const swap = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0); // where the scroll is
  const [shown, setShown] = useState(0); // what the arm is holding
  const [onScreen, setOnScreen] = useState(false);
  const [settled, setSettled] = useState(0); // bumps when a swap finishes
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis();
  const project = projects[shown];

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

  // Pick-and-place whenever the scroll lands on a different project.
  useEffect(() => {
    wanted.current = active;
    if (active === shown && !swap.current?.isActive()) return;
    if (reduced) {
      swap.current?.kill();
      Object.assign(motion.current, { drop: 0, grip: 0, exchange: 0 });
      setShown(active);
      return;
    }
    if (swap.current?.isActive()) return; // the running swap picks up `wanted` at its low point
    swap.current = gsap
      .timeline({ onComplete: () => setSettled((n) => n + 1) })
      .to(motion.current, { drop: 1, duration: 0.7, ease: "power2.inOut" })
      .to(motion.current, { grip: 1, duration: 0.18, ease: "power2.out" })
      .to(motion.current, { exchange: 1, duration: 0.15, ease: "none" })
      .call(() => setShown(wanted.current))
      .to(motion.current, { exchange: 0, duration: 0.15, ease: "none" })
      .to(motion.current, { grip: 0, duration: 0.2, ease: "power2.out" })
      .to(motion.current, { drop: 0, duration: 0.85, ease: "power2.inOut" });
    // `settled` re-runs this after a swap, in case the scroll moved on meanwhile.
  }, [active, shown, reduced, settled]);

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
        <div className="pointer-events-none absolute inset-0">
          {onScreen && (
            <Suspense fallback={null}>
              <RobotArm
                motion={motion}
                cardRef={cardRef}
                hudRef={hudRef}
                reduced={reduced}
                active={onScreen}
              />
            </Suspense>
          )}
        </div>

        {/* Teach-pendant readout */}
        <div
          ref={hudRef}
          aria-hidden
          className="shell-wide pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+1.5rem)] font-mono text-[0.7rem] leading-relaxed text-faint"
        >
          <div className="w-fit">
            <p className="mb-2 flex items-center gap-2 tracking-[0.14em] uppercase">
              <span className="size-1.5 rounded-full bg-brand" />
              Arm online · pick &amp; place
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
                CLOSED
              </span>
            </p>
          </div>
        </div>

        {/* The card the arm is holding (positioned every frame by RobotArm) */}
        <div
          ref={cardRef}
          className="absolute top-0 left-0 w-[26rem] origin-left opacity-0 will-change-transform xl:w-[30rem]"
        >
          <span aria-hidden className="robot-grip-seat" />
          <span aria-hidden data-jaw className="robot-grip-jaw"><i /><i /></span>
          <Card data-payload className="gap-4 overflow-hidden pt-0 shadow-soft">
            <AspectRatio ratio={16 / 10} className="overflow-hidden border-b bg-muted">
              <img
                src={project.thumb ?? project.image}
                alt={`${project.title} screenshot`}
                className="size-full object-cover object-top"
              />
            </AspectRatio>
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
                {project.stack.slice(0, 5).map((s) => (
                  <li key={s}>
                    <Badge variant="secondary" className="font-mono font-normal">
                      {s}
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
          className="shell-wide absolute inset-x-0 bottom-6 flex items-end justify-between gap-6"
        >
          <p className="type-meta flex items-center gap-1.5 whitespace-nowrap">
            <ArrowDown size={12} weight="bold" />
            Scroll or press <Kbd>←</Kbd>
            <Kbd>→</Kbd> to swap projects
          </p>
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
                  {i !== active && <TooltipContent side="top">{p.title}</TooltipContent>}
                </Tooltip>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
