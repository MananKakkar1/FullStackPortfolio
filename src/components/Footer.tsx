import { profile, socials } from "../constants";
import { ArrowUpRight } from "../lib/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl font-medium tracking-tight text-ink">
            {profile.name}
          </p>
          <p className="mt-2 text-sm text-muted">
            {profile.location} · Available for internships and research
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
              >
                {s.label}
                <ArrowUpRight
                  size={13}
                  weight="bold"
                  className="translate-y-px transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="shell pb-10">
        <p className="text-xs text-faint">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
