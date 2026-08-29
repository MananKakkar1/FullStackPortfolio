import { useRef } from "react";
import { experience } from "../constants";
import { gsap, useGSAP, withMotion } from "../lib/scroll";
import SectionHeading from "../components/SectionHeading";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      withMotion(
        () => {
          gsap.utils.toArray<HTMLElement>(".exp-row").forEach((row) => {
            gsap.from(row, {
              y: 28,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 82%" },
            });
          });
        },
        () => {
          gsap.set(".exp-row", { autoAlpha: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="section-gap">
      <div className="shell">
        <SectionHeading title="Career Timeline." />

        <ol className="mt-[var(--space-block)] divide-y divide-border border-t border-border">
          {experience.map((item) => (
            <li
              key={item.company}
              className="exp-row grid gap-4 py-8 md:grid-cols-[11rem_1fr] md:gap-10 md:py-10"
            >
              <div className="type-meta md:pt-1.5">{item.period}</div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="type-display-m text-ink">{item.role}</h3>
                  <span className="text-sm text-muted">
                    {item.company} · {item.place}
                  </span>
                </div>
                <p className="mt-3 text-muted">{item.summary}</p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-sm text-muted before:absolute before:left-0 before:top-[0.62em] before:h-px before:w-3 before:bg-border-strong"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
