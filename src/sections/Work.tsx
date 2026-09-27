import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/constants";
import { useMediaQuery } from "@/lib/hooks";
import { revealDelay } from "@/lib/reveal";
import { supportsWebGL } from "@/lib/webgl";
import { ArrowUpRight } from "@/lib/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RobotShowcase from "./work/RobotShowcase";

export default function Work() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [webgl] = useState(supportsWebGL);

  return (
    <section id="work" className="pt-[var(--space-section)]">
      <div data-reveal className="shell">
        <h2 className="type-display-l max-w-[20ch] text-foreground">Selected work.</h2>
        <p className="type-lead mt-5 max-w-[48ch] text-muted-foreground">
          {projects.length} projects across robotics, AI, systems, and the web.
        </p>
      </div>

      {isDesktop && webgl ? (
        <RobotShowcase />
      ) : (
        <div className="shell mt-[var(--space-block)] grid gap-6 pb-[var(--space-section)] sm:grid-cols-2">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              to={`/work/${p.id}`}
              data-reveal
              style={revealDelay((i % 2) * 80)}
              className="group block rounded-xl"
            >
              <Card className="h-full gap-0 overflow-hidden py-0 shadow-none transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-border-strong group-hover:shadow-soft">
                <AspectRatio ratio={16 / 10} className="overflow-hidden border-b bg-muted">
                  <img
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </AspectRatio>
                <CardHeader className="px-5 pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <CardTitle className="type-display-m">{p.title}</CardTitle>
                    <span className="type-meta shrink-0">{p.year}</span>
                  </div>
                  <CardDescription>{p.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-1.5 px-5 pt-4">
                  {p.stack.slice(0, 3).map((s) => (
                    <Badge key={s} variant="secondary" className="font-mono font-normal">
                      {s}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto gap-1 px-5 pt-4 pb-5 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {p.category}
                  <ArrowUpRight
                    size={13}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
