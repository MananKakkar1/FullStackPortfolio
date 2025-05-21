import '../components/css_files/Projects.css'
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
};

let projectsList = [
  {
    id: "chess-game",
    title: "Chess Game",
    description:
      "A simple chess game built with HTML, CSS, JavaScript, and Python.",
    image: "/images/temp.jpg",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A personal portfolio website built using React, TypeScript, and modern web technologies to showcase my skills and projects.",
    image: "/images/temp.jpg",
  },
  {
    id: "file-system-tree-visualizer",
    title: "File System Tree Visualizer",
    description:
      "A visualizer for file system trees, built with Python and Pygame, to help users understand the structure of their file systems.",
    image: "/images/temp.jpg",
  },
  {
    id: "system-overlay-python-script",
    title: "System Overlay Python Script",
    description:
      "A Python script that overlays system information on the screen, providing real-time updates on system performance.",
    image: "/images/temp.jpg",
  },
  {
    id: "ai-paint-desktop-app",
    title: "AI-Paint Desktop App",
    description:
      "AI-Paint is a desktop application inspired by Microsoft Paint, allowing users to draw freely as well as generate AI-created images using text prompts.",
    image: "/images/temp.jpg",
  },
  {
    id: "custom-linux-shell",
    title: "Custom Linux Shell",
    description:
      "A custom Linux shell built using C, designed to provide a unique command-line interface and support for various shell features.",
    image: "/images/temp.jpg",
  },
  {
    id: "maze-runner-game",
    title: "Maze Runner Game",
    description:
      "A maze runner game built with python's pygame, where players navigate through a maze to reach the finish line.",
    image: "/images/temp.jpg",
  },
  {
    id: "sokoban-game",
    title: "Sokoban Game",
    description:
      "A Sokoban game built with risc-v assembly, where players push boxes to designated locations on a board.",
    image: "/images/temp.jpg",
  },
  {
    id: "paint-like-desktop-app",
    title: "Paint-Like Desktop App",
    description:
      "A desktop application inspired by Microsoft Paint, allowing users to draw freely and create digital art.",
    image: "/images/temp.jpg",
  },
  {
    id: "world-population-data-extractor",
    title: "World Population Data Extractor",
    description:
      "A Python script that extracts and organizes world population data from various sources in a csv file, providing insights into global demographics.",
    image: "/images/temp.jpg",
  },
  {
    id: "pokemon-game",
    title: "Pokemon Game",
    description:
      "A Text based Pokemon game built with Python, where players can play through a story driven by user choices.",
    image: "/images/temp.jpg", 
  }
];

const Projects = () => (
  <div className="projects-page-background">
    <h1>My Projects</h1>
    <div className="projects-list">
      {projectsList.map((project) => (
        <a
          key={project.id}
          className="project-entry"
          href={`/projects/${project.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={project.image} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </a>
      ))}
    </div>
  </div>
);

export default Projects;
export { projectsList };