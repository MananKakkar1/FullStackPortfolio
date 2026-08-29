import { Link } from "react-router-dom";
import { type Project, projectImage } from "../constants";
import { ArrowUpRight } from "../lib/icons";

/** Editorial project card. Sizing comes from the parent (grid cell or rail item). */
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <img
          src={projectImage(project)}
          alt={`${project.title} preview`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="type-display-m text-ink">{project.title}</h3>
          <span className="type-meta shrink-0">{project.year}</span>
        </div>
        <p className="mt-1.5 text-sm text-muted">{project.summary}</p>
        <div className="mt-auto flex items-center gap-1 pt-4 text-sm text-muted transition-colors group-hover:text-ink">
          <span>{project.category}</span>
          <ArrowUpRight
            size={13}
            weight="bold"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
