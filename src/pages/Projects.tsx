import "../components/css_files/Projects.css";
import tempImg from "../assets/temp.jpg";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  sourceUrl: string;
  category: string;
  technologies: string;
  latex_description?: string;
};

const projectsList: Project[] = [
  {
    id: "chess-game",
    title: "Chess Game",
    description:
      "A simple chess game built with HTML, CSS, JavaScript, and Python.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/Chess_Game",
    category: "Website",
    technologies: "JavaScript + HTML + CSS + Python (Flask)",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Built a responsive web-based chess platform, supporting complete chess rules, move validation, and real-time user interaction.}
    \\resumeItem{Designed and implemented \\textbf{4 AI difficulty modes}, including integration of \\textbf{Stockfish} and a custom \\textbf{GPT-based chess engine} using OpenAI API and prompt engineering.}
    \\resumeItem{Reduced AI response time by \\textbf{\\textasciitilde30\\%} through asynchronous communication and optimized prompt formatting for GPT-based engine.}
    \\resumeItem{Added \\textbf{15+ JavaScript unit tests} to ensure correctness of backend logic (e.g., legal move generation, check/checkmate, board state evaluation).}
    \\resumeItemListEnd
  `,
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A personal portfolio website built using React, TypeScript, and modern web technologies to showcase my skills and projects.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/FullStackPortfolio",
    category: "Website",
    technologies: "React + TypeScript + Vite + Node.js + Express.js + Nodemailer",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Developed a responsive and interactive personal portfolio website using \\textbf{React} with \\textbf{TypeScript}, leveraging \\textbf{Vite} for efficient bundling and development workflow.}
    \\resumeItem{Implemented modern web development practices, including \\textbf{ESLint} for code quality and \\textbf{TypeScript} for type safety, enhancing code reliability and developer experience.}
    \\resumeItem{Built a lightweight \\textbf{Node.js + Express.js} backend to handle server-side routing and integrate email functionality through the usage of \\textbf{Nodemailer}.}
    \\resumeItem{Enabled dynamic email sending from the \\textbf{Contact Me} page, allowing users to reach out directly through the website.}
    \\resumeItem{Utilized \\textbf{Git} for version control and hosted the source code on \\textbf{GitHub}, enabling collaboration and showcasing the project to potential employers.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "file-system-tree-visualizer",
    title: "File System Tree Visualizer",
    description:
      "A visualizer for file system trees, built with Python and Pygame, to help users understand the structure of their file systems.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/File-System-Tree-Visualizer",
    category: "Data Extraction",
    technologies: "Python + Pygame",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Built an interactive visualization tool in \\textbf{Python using Pygame}, dynamically representing complex file system structures as hierarchical trees.}
    \\resumeItem{Implemented \\textbf{recursive algorithms} for real-time parsing and rendering, supported by \\textbf{15+ unit tests} using \\textbf{pytest} to validate traversal logic and event handling.}
    \\resumeItem{Designed intuitive \\textbf{expand/collapse} features to enhance user interaction and navigation.}
    \\resumeItem{Extended tool to visualize \\textbf{CSV data on academic papers} as a file tree, mapping metadata (e.g., authors, topics, years) into a structured folder view.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "system-overlay-python-script",
    title: "System Overlay Python Script",
    description:
      "A Python script that overlays system information on the screen, providing real-time updates on system performance.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/System-Overlay-Python-Script",
    category: "Data Extraction",
    technologies: "Python + OpenHardwareMonitor",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Developed a Python script to overlay real-time system information (CPU, memory, etc.) directly on the user's screen for instant monitoring.}
    \\resumeItem{Utilized cross-platform libraries to ensure compatibility and seamless display across different operating systems.}
    \\resumeItem{Implemented efficient polling and update mechanisms to minimize resource usage while maintaining up-to-date information.}
    \\resumeItem{Designed a user-friendly interface with customizable display options for enhanced usability.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "ai-paint-desktop-app",
    title: "AI-Paint Desktop App",
    description:
      "AI-Paint is a desktop application inspired by Microsoft Paint, allowing users to draw freely as well as generate AI-created images using text prompts.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/AI_Paint_Application",
    category: "Desktop Applications",
    technologies: "Java + JavaFX + Llama3",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Created a desktop drawing application inspired by Microsoft Paint, enabling users to sketch and design freely.}
    \\resumeItem{Integrated OpenAI API to allow users to generate AI-created images from text prompts, blending creativity with artificial intelligence.}
    \\resumeItem{Built the interface using \\textbf{Python Tkinter} for a responsive and intuitive user experience.}
    \\resumeItem{Implemented features such as brush selection, color palettes, and image export for comprehensive functionality.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "custom-linux-shell",
    title: "Custom Linux Shell",
    description:
      "A custom Linux shell built using C, designed to provide a unique command-line interface and support for various shell features.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/Custom-Linux-Shell",
    category: "Custom Shell",
    technologies: "C + Unix Sockets + Process Management",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Engineered a Linux shell from scratch in \\textbf{C}, supporting custom commands, dynamic environment variables, and enhanced user interactions.}
    \\resumeItem{Implemented \\textbf{recursive directory parsing} and robust file navigation with built-in fault tolerance and error handling mechanisms.}
    \\resumeItem{Enabled advanced shell functionalities such as \\textbf{background processing} and \\textbf{command piping} utilizing system calls like \\textbf{fork()}, \\textbf{exec()}, and robust inter-process communication techniques.}
    \\resumeItem{Developed a \\textbf{TCP socket-based communication module} for server-client interactions, enabling multi-client messaging and real-time data transfers with secure connections.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "maze-runner-game",
    title: "Maze Runner Game",
    description:
      "A maze runner game built with python's pygame, where players navigate through a maze to reach the finish line.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/MazeRunnerGame",
    category: "Games",
    technologies: "Python + Pygame",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Developed an interactive maze runner game using \\textbf{Python Pygame}, challenging players to navigate through complex mazes.}
    \\resumeItem{Implemented collision detection, player movement, and win condition logic for engaging gameplay.}
    \\resumeItem{Designed multiple maze layouts and increasing difficulty levels to enhance replayability.}
    \\resumeItem{Optimized game performance and user controls for a smooth and enjoyable experience.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "sokoban-game",
    title: "Sokoban Game",
    description:
      "A Sokoban game built with risc-v assembly, where players push boxes to designated locations on a board.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/Sokoban",
    category: "Games",
    technologies: "RISC-V Assembly",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Implemented the classic Sokoban puzzle game in \\textbf{RISC-V Assembly}, demonstrating low-level programming skills.}
    \\resumeItem{Designed game logic for box-pushing mechanics, win conditions, and level progression.}
    \\resumeItem{Optimized memory usage and performance for efficient execution on RISC-V architecture.}
    \\resumeItem{Created a simple text-based interface for user interaction and gameplay visualization.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "paint-like-desktop-app",
    title: "Paint-Like Desktop App",
    description:
      "A desktop application inspired by Microsoft Paint, allowing users to draw freely and create digital art.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/Paint_Like_Application",
    category: "Desktop Applications",
    technologies: "Java + JavaFX + CSS",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Developed a desktop drawing application inspired by Microsoft Paint using \\textbf{Python Tkinter}.}
    \\resumeItem{Implemented core features such as freehand drawing, shape tools, color selection, and canvas resizing.}
    \\resumeItem{Enabled users to save and export their artwork in various image formats.}
    \\resumeItem{Focused on creating an intuitive and responsive user interface for seamless digital art creation.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "world-population-data-extractor",
    title: "World Population Data Extractor",
    description:
      "A Python script that extracts and organizes world population data from various sources in a csv file, providing insights into global demographics.",
    image: tempImg,
    sourceUrl:
      "https://github.com/MananKakkar1/world_population_data_extractor",
    category: "Data Extraction",
    technologies: "Python + CSV",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Created a Python script to extract, clean, and organize world population data from multiple online sources.}
    \\resumeItem{Automated the process of data aggregation and transformation into structured CSV files for analysis.}
    \\resumeItem{Implemented error handling and data validation to ensure accuracy and reliability of demographic insights.}
    \\resumeItem{Enabled further analysis and visualization of global population trends using the processed data.}
    \\resumeItemListEnd
  `,
  },
  {
    id: "pokemon-game",
    title: "Pokemon Game",
    description:
      "A Text based Pokemon game built with Python, where players can play through a story driven by user choices.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/Pokemon",
    category: "Text-Based Games",
    technologies: "Python",
    latex_description: `
    \\resumeItemListStart
    \\resumeItem{Developed a text-based Pokemon adventure game in Python, allowing players to progress through a story driven by their choices.}
    \\resumeItem{Implemented branching narratives, battles, and character progression for an engaging gameplay experience.}
    \\resumeItem{Designed a modular codebase to facilitate the addition of new storylines and features.}
    \\resumeItem{Focused on user interaction and replayability through multiple endings and decision points.}
    \\resumeItemListEnd
  `,
  },
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
