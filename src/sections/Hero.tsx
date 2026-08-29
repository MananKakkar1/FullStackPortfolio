import { Suspense, lazy, useRef } from "react";
import { gsap, useGSAP, withMotion } from "../lib/scroll";
import { profile } from "../constants";
import { usePrefersReducedMotion } from "../lib/hooks";
import Magnetic from "../components/Magnetic";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const NAME_WORDS = profile.name.split(" ");

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const showScene = supportsWebGL();

  useGSAP(
    () => {
      withMotion(
        () => {
          // Entrance
          gsap.from(".hero-word > span", {
            yPercent: 120,
            duration: 1,
            ease: "power4.out",
            stagger: 0.09,
            delay: 0.05,
          });
          gsap.from("[data-hero-stagger]", {
            y: 16,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.35,
          });

          // Scroll-linked hand-off: content drifts up a touch slower than the
          // page and dissolves as the hero leaves. No pin, so no dead scroll.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
          tl.to("[data-hero-content]", {
            yPercent: -14,
            autoAlpha: 0,
            filter: "blur(4px)",
            ease: "power1.in",
          }, 0);
          tl.to("[data-hero-scene]", {
            yPercent: 18,
            scale: 0.88,
            autoAlpha: 0,
            ease: "power1.in",
          }, 0);
        },
        () => {
          gsap.set(".hero-word > span", { yPercent: 0 });
        },
      );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]"
    >
      {showScene && (
        <div
          data-hero-scene
          className="pointer-events-none absolute inset-y-0 right-[-4%] hidden w-[44%] md:block"
        >
          <div className="relative size-full">
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </div>
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-bg to-transparent" />
        </div>
      )}

      <div data-hero-content className="shell relative z-10 w-full py-16">
        <p data-hero-stagger className="eyebrow">
          {profile.kicker}
        </p>

        <h1 className="type-display-xl mt-6 flex flex-wrap gap-x-[0.28em] text-ink">
          {NAME_WORDS.map((word) => (
            <span key={word} className="hero-word block overflow-hidden pb-[0.08em]">
              <span className="block">{word}</span>
            </span>
          ))}
        </h1>

        <p
          data-hero-stagger
          className="type-lead mt-7 max-w-[46ch] text-muted"
        >
          {profile.heroLine}
        </p>

        <div data-hero-stagger className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pressable inline-flex min-h-11 items-center rounded-[var(--radius-input)] bg-ink px-5 text-sm font-medium text-bg hover:bg-ink/90"
            >
              View work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pressable inline-flex min-h-11 items-center rounded-[var(--radius-input)] border border-border px-5 text-sm font-medium text-ink hover:border-border-strong"
            >
              Contact
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
