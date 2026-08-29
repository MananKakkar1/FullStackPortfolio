import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, withMotion } from "../../lib/scroll";
import { railProjects } from "../../constants";
import { useMediaQuery } from "../../lib/hooks";
import ProjectCard from "../ProjectCard";

/**
 * The non-featured projects as a horizontal rail. Desktop + motion: the section
 * pins and the track pans sideways with vertical scroll. Mobile or reduced
 * motion: a normal horizontal scroll-snap strip, no pin.
 */
export default function ProjectRail() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useGSAP(
    () => {
      if (!isDesktop || !track.current || !wrap.current) return;
      withMotion(() => {
        const getDistance = () =>
          Math.max(0, track.current!.scrollWidth - window.innerWidth + 24);
        gsap.to(track.current, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        ScrollTrigger.refresh();
      });
    },
    { scope: wrap, dependencies: [isDesktop] },
  );

  return (
    <section
      ref={wrap}
      className="relative mt-[var(--space-section)] overflow-hidden"
    >
      <div
        ref={track}
        className="flex items-center gap-6 px-[var(--gutter)] max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:pb-4 md:h-[100svh] md:w-max md:px-0 md:pt-[var(--nav-h)] md:pl-[max(var(--gutter),calc((100vw-var(--shell-wide))/2+var(--gutter)))]"
      >
        {railProjects.map((project) => (
          <div
            key={project.id}
            className="w-[78vw] shrink-0 snap-start sm:w-[58vw] md:w-[23rem] lg:w-[25rem]"
          >
            <ProjectCard project={project} />
          </div>
        ))}
        <div aria-hidden className="hidden shrink-0 md:block md:w-[10vw]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-bg to-transparent md:block"
      />
    </section>
  );
}
