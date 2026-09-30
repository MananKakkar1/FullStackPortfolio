import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLenis } from "lenis/react";
import { projects } from "@/constants";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useRevealObserver, revealDelay } from "@/lib/reveal";
import { ArrowLeft, ArrowRight, ArrowUpRight, GithubLogo, MagnifyingGlassPlus } from "@/lib/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd } from "@/components/ui/kbd";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;
  const prev = index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : undefined;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : undefined;
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useRevealObserver(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Reading progress, rounded to whole percents to keep re-renders rare.
  useLenis((lenis) => {
    const v = Math.round((lenis.progress || 0) * 100);
    setProgress((p) => (p === v ? p : v));
  });

  // ←/→ move between projects.
  useEffect(() => {
    if (!prev || !next) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      if ((e.target as HTMLElement | null)?.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") navigate(`/work/${prev.id}`);
      if (e.key === "ArrowRight") navigate(`/work/${next.id}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, navigate]);

  if (!project || !prev || !next) {
    return (
      <div className="shell flex min-h-[80vh] items-center pt-[var(--nav-h)]">
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle className="type-display-m">That project doesn't exist.</EmptyTitle>
            <EmptyDescription>It may have been renamed or removed.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild variant="outline">
              <Link to="/#work">Back to all work</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <>
      <Progress
        value={progress}
        aria-label="Reading progress"
        className="fixed inset-x-0 top-[var(--nav-h)] z-40 h-px rounded-none bg-border [&>[data-slot=progress-indicator]]:bg-brand"
      />

      <article className="pt-[calc(var(--nav-h)+clamp(2rem,6vh,4rem))]">
        <div className="shell">
          <Breadcrumb data-reveal>
            <BreadcrumbList className="font-mono text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#work">Work</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header: title + actions, with a spec sheet alongside */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-end lg:gap-16">
            <div data-reveal>
              <p className="type-meta">
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>
              <h1 className="type-display-xl mt-3 max-w-[14ch] text-foreground">{project.title}</h1>
              <p className="type-lead mt-5 max-w-[50ch] text-muted-foreground">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button asChild size="lg" className="h-11 rounded-lg px-5">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live site
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </Button>
                )}
                {project.sourceUrl && (
                  <Button
                    asChild
                    size="lg"
                    variant={project.liveUrl ? "outline" : "default"}
                    className="h-11 rounded-lg px-5"
                  >
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <GithubLogo size={16} weight="bold" />
                      Source
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <Card data-reveal style={revealDelay(80)} className="gap-0 py-0 shadow-none">
              <CardHeader className="border-b px-5 py-4">
                <CardTitle className="type-meta tracking-[0.14em] uppercase">Spec sheet</CardTitle>
              </CardHeader>
              <CardContent className="px-5 py-4 text-sm">
                <dl className="grid grid-cols-[5.5rem_1fr] gap-y-3">
                  <dt className="type-meta pt-0.5">Year</dt>
                  <dd className="text-foreground">{project.year}</dd>
                  <dt className="type-meta pt-0.5">Type</dt>
                  <dd>
                    <Badge variant="outline" className="font-mono font-normal text-muted-foreground">
                      {project.category}
                    </Badge>
                  </dd>
                  <dt className="type-meta pt-1">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <Badge key={s} variant="secondary" className="font-mono font-normal">
                        {s}
                      </Badge>
                    ))}
                  </dd>
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Demo video when there is one (silent, loops inline); otherwise the zoomable screenshot */}
          {project.video ? (
            <div data-reveal className="mt-12 overflow-hidden rounded-xl border bg-muted shadow-soft">
              <AspectRatio ratio={16 / 9}>
                <video
                  key={project.video}
                  src={project.video}
                  poster={project.videoPoster}
                  aria-label={`${project.title} demo video`}
                  className="size-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay={!reducedMotion}
                  controls={reducedMotion}
                />
              </AspectRatio>
            </div>
          ) : (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                data-reveal
                className="group relative mt-12 block w-full cursor-zoom-in overflow-hidden rounded-xl border bg-muted text-left shadow-soft"
                aria-label={`View ${project.title} screenshot full size`}
              >
                <AspectRatio ratio={16 / 10}>
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="size-full object-cover object-top transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
                  />
                </AspectRatio>
                <Badge className="absolute right-4 bottom-4 gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <MagnifyingGlassPlus size={13} weight="bold" />
                  Zoom
                </Badge>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[min(92vw,1400px)] p-2 sm:max-w-[min(92vw,1400px)]">
              <DialogTitle className="sr-only">{project.title} screenshot</DialogTitle>
              <DialogDescription className="sr-only">{project.summary}</DialogDescription>
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="max-h-[85vh] w-full rounded-lg object-contain"
              />
            </DialogContent>
          </Dialog>
          )}

          {/* Overview + highlights */}
          <div className="mt-16 grid gap-12 pb-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <section data-reveal>
              <h2 className="type-meta mb-4 tracking-[0.14em] uppercase">Overview</h2>
              <p className="type-lead text-muted-foreground">{project.description}</p>
            </section>

            <section data-reveal style={revealDelay(80)}>
              <h2 className="type-meta mb-4 tracking-[0.14em] uppercase">Highlights</h2>
              <ItemGroup className="rounded-xl border">
                {project.highlights.map((h, i) => (
                  <div key={h}>
                    {i > 0 && <ItemSeparator />}
                    <Item size="sm" className="items-start">
                      <ItemMedia className="type-meta w-6 pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="font-normal leading-relaxed text-muted-foreground">
                          {h}
                        </ItemTitle>
                      </ItemContent>
                    </Item>
                  </div>
                ))}
              </ItemGroup>
            </section>
          </div>
        </div>

        {/* Previous / next */}
        <Separator />
        <nav aria-label="More projects" className="shell py-12 md:py-16">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="type-meta">More projects</p>
            <p className="type-meta hidden items-center gap-1.5 sm:flex">
              <Kbd>←</Kbd>
              <Kbd>→</Kbd>
              to browse
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {([
              [prev, "Previous"],
              [next, "Next"],
            ] as const).map(([p, label]) => (
              <Link key={label} to={`/work/${p.id}`} className="group block rounded-xl">
                <Card className="h-full gap-0 overflow-hidden py-0 shadow-none transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-border-strong group-hover:shadow-soft">
                  <AspectRatio ratio={16 / 9} className="overflow-hidden border-b bg-muted">
                    <img
                      src={p.thumb ?? p.image}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </AspectRatio>
                  <CardHeader className={cn("px-5 py-5", label === "Next" && "text-right")}>
                    <CardDescription
                      className={cn(
                        "flex items-center gap-1.5 font-mono text-xs",
                        label === "Next" && "justify-end",
                      )}
                    >
                      {label === "Previous" && <ArrowLeft size={12} weight="bold" />}
                      {label}
                      {label === "Next" && <ArrowRight size={12} weight="bold" />}
                    </CardDescription>
                    <CardTitle className="type-display-m">{p.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </nav>
      </article>
    </>
  );
}

