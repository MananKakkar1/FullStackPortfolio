import React, { useEffect, useState } from "react";
import "../components/css_files/Home.css"; // Ensure this imports the flip CSS

interface Project {
  id?: string | number;
  title: string;
  description: string;
  image?: string;
}

const FLIP_DURATION = 600; // ms, should match your CSS transition

function getRandomProjects(projectsList: Project[], count: number) {
  const shuffled = [...projectsList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const FeaturedProjects = ({
  projectsList,
  count = 3,
}: {
  projectsList: Project[];
  count?: number;
}) => {
  const [displayed, setDisplayed] = useState(() =>
    getRandomProjects(projectsList, count)
  );
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setDisplayed(getRandomProjects(projectsList, count));
        setFlipping(false);
      }, FLIP_DURATION);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, [projectsList, count]);

  return (
    <div className="home-projects-list">
      {displayed.map((project, idx) => (
        <div
          key={project.id || idx}
          className={`project-flip-container${flipping ? " flipping" : ""}`}
        >
          <div className="project-flip-inner">
            <div className="project-flip-front">
              <div className="project-entry">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {/* Add image, links, etc. as needed */}
              </div>
            </div>
            <div className="project-flip-back">
              {/* Optionally, show a loading spinner or next project preview */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjects;
