import { useParams } from "react-router-dom";
import { projectsList } from "./Projects.tsx";
import type { Project } from "./Projects.tsx";
import "../components/css_files/ProjectDetail.css";

const ProjectDetail = () => {
  console.log("ProjectDetail component rendered");
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsList.find((p: Project) => p.id === projectId);

  if (!project)
    return (
      <div className="project-detail-container">
        <div className="project-detail-card">Project not found.</div>
      </div>
    );

  return (
    <div className="project-detail-container">
      <div className="project-detail-card">
        <h2>{project.title}</h2>
        <img src={project.image} alt={project.title} />
        <p>{project.description}</p>
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-btn"
          >
            To learn more, check out the source code on my personal Github
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
