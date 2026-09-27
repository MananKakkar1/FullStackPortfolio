import { useRef } from "react";
import photo from "@/assets/photo.jpg";
import { profile, facts, skillGroups } from "@/constants";
import { gsap, useGSAP, withMotion } from "@/lib/scroll";
import { revealDelay } from "@/lib/reveal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";

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
        <h2 data-reveal className="type-display-l max-w-[20ch] text-foreground">
          Profile.
        </h2>

        <ItemGroup data-reveal className="mt-[var(--space-block)] rounded-xl border">
          {facts.map((f, i) => (
            <div key={f.label}>
              {i > 0 && <ItemSeparator />}
              <Item className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <ItemDescription className="type-meta">{f.label}</ItemDescription>
                <ItemContent>
                  <ItemTitle className="font-normal text-foreground">{f.value}</ItemTitle>
                </ItemContent>
              </Item>
            </div>
          ))}
        </ItemGroup>

        <div className="mt-[var(--space-block)] grid gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <div data-reveal className="type-lead space-y-5 text-muted-foreground">
            {profile.aboutBio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <figure
            data-reveal
            style={revealDelay(80)}
            className="about-photo overflow-hidden rounded-xl border bg-muted"
          >
            <AspectRatio ratio={4 / 5}>
              <img src={photo} alt="Manan Kakkar" className="size-full scale-110 object-cover" />
            </AspectRatio>
          </figure>
        </div>

        <div data-reveal className="mt-[var(--space-section)]">
          <h3 className="type-display-m text-foreground">Tech Stack.</h3>
          <dl className="mt-6">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <Separator />
                <div className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="type-meta pt-1">{group.title}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline" className="font-normal text-muted-foreground">
                        {item}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
