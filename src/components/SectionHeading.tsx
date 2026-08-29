import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

/** Section header: headline, optional lead stacked below it. No eyebrow, no number. */
export default function SectionHeading({ title, lead, className }: Props) {
  return (
    <Reveal className={className}>
      <h2 className="type-display-l max-w-[20ch] text-ink">{title}</h2>
      {lead ? (
        <p className="type-lead mt-5 max-w-[48ch] text-muted">{lead}</p>
      ) : null}
    </Reveal>
  );
}
