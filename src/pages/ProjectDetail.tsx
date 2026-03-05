import { Link, useParams } from "react-router-dom";
import { projectsList } from "./Projects.tsx";
import type { Project } from "./Projects.tsx";
import "../components/css_files/ProjectDetail.css";
import "../components/css_files/Themes.css";
import { useTheme } from "../components/ThemeContext";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { theme } = useTheme();
  const project = projectsList.find((p: Project) => p.id === projectId);
  const techList = project?.technologies
    ? project.technologies.split("+").map((t) => t.trim()).filter(Boolean)
    : [];

  if (!project)
    return (
      <div className="project-detail-container">
        <div className="project-detail-card">Project not found.</div>
      </div>
    );

  return (
    <div className={`project-detail-container ${theme}`}>
      <div className="project-detail-head">
        <p className="project-detail-kicker">{project.category}</p>
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-meta">
          Detailed project breakdown with stack and source access.
        </p>
      </div>
      <div className="project-browser-window">
        <div className="project-browser-bar">
          <span className="project-browser-dot red"></span>
          <span className="project-browser-dot yellow"></span>
          <span className="project-browser-dot green"></span>
        </div>
        <div className="project-detail-img-area">
          <img src={project.image} alt={project.title} />
        </div>
      </div>
      {techList.length > 0 && (
        <div className="project-detail-tech">
          {techList.map((tech) => (
            <span key={tech} className="project-tech-pill">
              {tech}
            </span>
          ))}
        </div>
      )}
      <div className="project-detail-description">{project.description}</div>
      <div className="project-detail-actions">
        <Link to="/projects" className="project-back-btn">
          Back to Projects
        </Link>
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-btn"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View Source on GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
