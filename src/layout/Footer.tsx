import { profile, socials } from "@/constants";
import { ArrowUpRight } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer>
      <Separator />
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl font-medium tracking-tight text-foreground">
            {profile.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {profile.location}
          </p>
        </div>
        <ul className="-ml-3 flex flex-wrap gap-x-1 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <Button
                asChild
                variant="link"
                className="group gap-1 font-normal text-muted-foreground hover:text-foreground hover:no-underline"
              >
                <a
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {s.label}
                  <ArrowUpRight
                    size={13}
                    weight="bold"
                    className="translate-y-px transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Button>
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
