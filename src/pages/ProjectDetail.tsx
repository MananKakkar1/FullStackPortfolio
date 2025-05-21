import { useParams } from "react-router-dom";
import { projectsList } from "./Projects";
import type { Project } from "./Projects";
import "../components/css_files/ProjectDetail.css";

const ProjectDetail = () => {
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
      </div>
    </div>
  );
};

export default ProjectDetail;
