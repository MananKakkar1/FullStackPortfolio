import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, projectImage } from "../constants";
import Reveal from "../components/Reveal";
import ScrollProgress from "../components/ScrollProgress";
import { ArrowLeft, ArrowRight } from "../lib/icons";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((p) => p.id === id);
  const project = index >= 0 ? projects[index] : undefined;
  const next = index >= 0 ? projects[(index + 1) % projects.length] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-start justify-center gap-4 pt-[var(--nav-h)]">
        <p className="type-meta">404</p>
        <h1 className="type-display-l text-ink">That project doesn't exist.</h1>
        <Link to="/#work" className="link-underline text-muted hover:text-ink">
          Back to all work
        </Link>
      </div>
    );
  }

  return (
    <>
      <ScrollProgress />
      <article className="pt-[calc(var(--nav-h)+clamp(2rem,6vh,4rem))]">
        <div className="shell">
          <Link
            to="/#work"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-ink"
          >
            <ArrowLeft
              size={13}
              weight="bold"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Selected work
          </Link>

          <Reveal className="mt-8">
            <p className="type-meta">
              {project.category} · {project.year}
            </p>
            <h1 className="type-display-xl mt-4 max-w-[16ch] text-ink">
              {project.title}
            </h1>
            <p className="type-lead mt-5 max-w-[52ch] text-muted">{project.summary}</p>
          </Reveal>

          <Reveal className="mt-12">
            <figure className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
              <img
                src={projectImage(project)}
                alt={`${project.title} screenshot`}
                className="w-full object-cover"
              />
            </figure>
          </Reveal>

          <div className="mt-14 grid gap-12 pb-8 md:grid-cols-[1.5fr_1fr] md:gap-16">
            <Reveal className="type-lead space-y-5 text-muted">
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable inline-flex min-h-11 items-center rounded-[var(--radius-input)] bg-ink px-4 text-sm font-medium text-bg hover:bg-ink/90"
                  >
                    Live site
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable inline-flex min-h-11 items-center rounded-[var(--radius-input)] border border-border px-4 text-sm font-medium text-ink hover:border-border-strong"
                  >
                    Source
                  </a>
                )}
              </div>
            </Reveal>

            <Reveal delay={80} className="space-y-8">
              <div>
                <h2 className="type-meta mb-3">Stack</h2>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                  {project.stack.map((s) => (
                    <li key={s} className="text-sm text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="type-meta mb-3">Highlights</h2>
                <ul className="space-y-2.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-5 text-sm text-muted before:absolute before:left-0 before:top-[0.62em] before:h-px before:w-3 before:bg-border-strong"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {next && (
          <div className="border-t border-border">
            <div className="shell py-12 md:py-16">
              <p className="type-meta mb-6">Next project</p>
              <Link
                to={`/work/${next.id}`}
                className="group grid gap-6 sm:grid-cols-[1.1fr_1fr] sm:items-center sm:gap-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-2">
                  <img
                    src={projectImage(next)}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="type-meta">
                    {next.category} · {next.year}
                  </p>
                  <h2 className="type-display-l mt-2 text-ink">{next.title}</h2>
                  <p className="mt-3 max-w-[42ch] text-muted">{next.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    <span className="link-underline">View project</span>
                    <ArrowRight
                      size={15}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
