import { projects } from "../constants";
import SectionHeading from "../components/SectionHeading";
import FeaturedStack from "../components/work/FeaturedStack";
import ProjectRail from "../components/work/ProjectRail";

export default function Work() {
  return (
    <section id="work" className="pt-[var(--space-section)]">
      <div className="shell">
        <SectionHeading
          title="Selected work."
          lead={`${projects.length} projects across robotics, systems, AI, and the web.`}
        />
      </div>

      <FeaturedStack />
      <ProjectRail />
    </section>
  );
}
