import { useRef } from "react";
import { experience } from "@/constants";
import { gsap, useGSAP, withMotion } from "@/lib/scroll";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";

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
        <h2 data-reveal className="type-display-l max-w-[20ch] text-foreground">
          Career Timeline.
        </h2>

        <ItemGroup className="mt-[var(--space-block)]">
          {experience.map((item, i) => (
            <div key={`${item.company}-${item.role}`} className="exp-row">
              {i > 0 && <ItemSeparator />}
              <Item className="grid items-start gap-4 px-0 py-8 md:grid-cols-[11rem_1fr_auto] md:gap-10 md:py-10">
                <ItemDescription className="type-meta md:pt-1.5">{item.period}</ItemDescription>
                <ItemContent className="gap-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <ItemTitle className="type-display-m">{item.role}</ItemTitle>
                    <span className="text-sm text-muted-foreground">
                      {item.company} · {item.place}
                    </span>
                  </div>
                  {item.summary && <p className="mt-3 text-muted-foreground">{item.summary}</p>}
                  {item.points.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="relative pl-5 text-sm text-muted-foreground before:absolute before:left-0 before:top-[0.62em] before:h-px before:w-3 before:bg-border-strong"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </ItemContent>
                {item.period.includes("Present") && (
                  <ItemActions className="max-md:row-start-1 md:pt-1">
                    <Badge variant="outline" className="gap-1.5 font-mono font-normal text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                      Current
                    </Badge>
                  </ItemActions>
                )}
              </Item>
            </div>
          ))}
        </ItemGroup>
      </div>
    </section>
  );
}
