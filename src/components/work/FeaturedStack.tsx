import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/scroll";
import { withMotion } from "../../lib/scroll";
import { featuredProjects, projectImage } from "../../constants";
import { ArrowRight } from "../../lib/icons";

/**
 * Featured work as a sticky card stack. Each panel sticks under the nav; the
 * next panel rises over it while the outgoing one scales back and softens.
 * Reduced motion: panels are static, full-opacity, normal flow.
 */
export default function FeaturedStack() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".feat-card");

      withMotion(
        () => {
          cards.forEach((card, i) => {
            const inner = card.querySelector<HTMLElement>(".feat-inner");
            const media = card.querySelector<HTMLElement>(".feat-media img");

            if (media) {
              gsap.fromTo(
                media,
                { yPercent: -6 },
                {
                  yPercent: 6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            }

            if (i < cards.length - 1 && inner) {
              gsap.to(inner, {
                scale: 0.94,
                opacity: 0.5,
                filter: "blur(3px)",
                ease: "none",
                scrollTrigger: {
                  trigger: cards[i + 1],
                  start: "top 85%",
                  end: "top top",
                  scrub: 0.5,
                },
              });
            }
          });
          ScrollTrigger.refresh();
        },
        () => {
          gsap.set(".feat-card", { position: "relative", top: "auto" });
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-[var(--space-block)]">
      {featuredProjects.map((project, i) => (
        <div
          key={project.id}
          className="feat-card sticky top-[calc(var(--nav-h)+1.5rem)] flex min-h-[62svh] items-start px-[var(--gutter)] pb-[clamp(1rem,4vh,2.5rem)]"
        >
          <div className="feat-inner mx-auto w-full max-w-[var(--shell-wide)] rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-[var(--shadow-soft)] md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="type-meta">
                    {String(i + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
                  </span>
                  <span className="type-meta">{project.category}</span>
                </div>
                <h3 className="type-display-l mt-4 text-ink">{project.title}</h3>
                <p className="type-lead mt-4 max-w-[42ch] text-muted">
                  {project.summary}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
                  {project.stack.slice(0, 6).map((s) => (
                    <li key={s} className="font-mono text-xs text-faint">
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/work/${project.id}`}
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink"
                >
                  <span className="link-underline">View project</span>
                  <ArrowRight
                    size={15}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="feat-media relative aspect-[16/11] overflow-hidden rounded-[var(--radius-sm)] bg-surface-2">
                <img
                  src={projectImage(project)}
                  alt={`${project.title} preview`}
                  loading="lazy"
                  className="absolute inset-0 size-full scale-110 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
