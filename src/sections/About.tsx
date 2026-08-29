import { useRef } from "react";
import photo from "../assets/photo.jpg";
import { profile, facts, skillGroups } from "../constants";
import { gsap, useGSAP, withMotion } from "../lib/scroll";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      withMotion(() => {
        const img = root.current?.querySelector<HTMLElement>(".about-photo img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: ".about-photo",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="section-gap">
      <div className="shell">
        <SectionHeading title="Profile." />

        <Reveal className="mt-[var(--space-block)]">
          <dl className="grid gap-x-8 gap-y-4 border-y border-border py-6 sm:grid-cols-[9rem_1fr]">
            {facts.map((f) => (
              <div key={f.label} className="contents">
                <dt className="type-meta pt-0.5">{f.label}</dt>
                <dd className="text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-[var(--space-block)] grid gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <Reveal className="type-lead space-y-5 text-muted">
            {profile.aboutBio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>

          <Reveal delay={80}>
            <figure className="about-photo overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
              <img
                src={photo}
                alt="Manan Kakkar"
                className="aspect-[4/5] w-full scale-110 object-cover"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-[var(--space-section)]">
          <h3 className="type-display-m text-ink">Tech Stack.</h3>
          <dl className="mt-6 divide-y divide-border border-t border-border">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8"
              >
                <dt className="type-meta pt-1">{group.title}</dt>
                <dd className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
