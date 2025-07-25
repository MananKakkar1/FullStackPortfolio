"use client";

import { useState } from "react";
import "../components/css_files/Projects.css";
import chessImg from "../assets/chess-pic.png";
import portfolioImg from "../assets/portfolio2.png";
import fileSystemImg from "../assets/file-system-tree.png";
import paintLikeImg from "../assets/paint-like.png";
import aiPaintImg from "../assets/ai-paint.png";
import sokobanImg from "../assets/sokoban.png";
import mazeRunnerImg from "../assets/maze-game.png";
import shellImg from "../assets/shell.png";
import extractorImg from "../assets/extractor.png";
import pokemonImg from "../assets/pokemon.png";
import systemOverlayImg from "../assets/system-overlay.png";
import othelloImg from "../assets/Othello.png";
import tempImg from "../assets/temp.jpg";
import netlyImg from "../assets/Netly.png";
import githubDiscordBotImg from "../assets/discord.png";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  sourceUrl: string;
  category: string;
  technologies: string;
  funFacts?: string[];
  latex_description?: string;
};

const projectsList: Project[] = [
  {
    id: "chess-game",
    title: "Chess Game",
    description:
      "A simple chess game built with HTML, CSS, JavaScript, and Python.",
    latex_description:
      "Built a browser-based chess game with 4 AI difficulty modes, Stockfish and GPT integration, and async communication to reduce AI response time by 30%.",
    image: chessImg,
    sourceUrl: "https://github.com/MananKakkar1/Chess_Game",
    category: "Websites",
    technologies: "JavaScript + HTML + CSS + Python (Flask)",
    funFacts: [
      "Features 4 AI difficulty modes.",
      "Integrates Stockfish and GPT-based chess engine.",
      "Has 15+ JavaScript unit tests.",
      "Async communication reduces AI response time by ~30%.",
    ],
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A personal portfolio website built using React, TypeScript, and modern web technologies to showcase my skills and projects.",
    latex_description:
      "Developed a modern React and TypeScript portfolio site with dynamic contact forms, responsive design, and a custom Node.js backend for email delivery.",
    image: portfolioImg,
    sourceUrl: "https://github.com/MananKakkar1/FullStackPortfolio",
    category: "Websites",
    technologies:
      "React + TypeScript + Vite + Node.js + Express.js + Nodemailer",
    funFacts: [
      "Responsive and interactive design.",
      "Dynamic email sending from the Contact Me page.",
      "Lightweight Node.js + Express.js backend.",
      "Utilizes Git for version control.",
    ],
  },
  {
    id: "file-system-tree-visualizer",
    title: "File System Tree Visualizer",
    description:
      "A visualizer for file system trees, built with Python and Pygame, to help users understand the structure of their file systems.",
    latex_description:
      "Visualized hierarchical file system structures in Python using Pygame; supports real-time rendering, CSV data parsing, and interactive exploration.",
    image: fileSystemImg,
    sourceUrl: "https://github.com/MananKakkar1/File-System-Tree-Visualizer",
    category: "Data Analysis",
    technologies: "Python + Pygame",
    funFacts: [
      "Interactive visualization of file systems.",
      "Real-time parsing and rendering.",
      "Intuitive expand/collapse features.",
      "Visualizes CSV data as a file tree.",
    ],
  },
  {
    id: "system-overlay-python-script",
    title: "System Overlay Python Script",
    description:
      "A Python script that overlays system information on the screen, providing real-time updates on system performance.",
    latex_description:
      "Created a cross-platform Python GUI to overlay live CPU/GPU and system performance metrics using OpenHardwareMonitor and Tkinter.",
    image: systemOverlayImg,
    sourceUrl: "https://github.com/MananKakkar1/System-Overlay-Python-Script",
    category: "Data Analysis",
    technologies: "Python + OpenHardwareMonitor + Python's Tkinter",
    funFacts: [
      "Overlays real-time system information on the screen.",
      "Cross-platform compatibility.",
      "Efficient polling and update mechanisms.",
      "Customizable display options.",
    ],
  },
  {
    id: "ai-paint-desktop-app",
    title: "SmartPaint",
    description:
      "AI-Paint is a desktop application inspired by Microsoft Paint, allowing users to draw freely as well as generate AI-created images using text prompts.",
    latex_description:
      "\\resumeProjectHeading\n  {\\textbf{SmartPaint} $|$ \\emph{Java, JavaFX, Llama3}}{}\n  \\resumeItemListStart\n    \\resumeItem{Built a desktop paint app with \\textbf{JavaFX} using \\textbf{Agile} practices, supporting shape drawing, and erasing tools.}\n    \\resumeItem{Implemented agentic AI workflow with \\textbf{Llama3} for shape generation based on natural language prompts.}\n    \\resumeItem{Designed a \\textbf{finite state machine} to manage user interaction modes, improving UI modularity and responsiveness.}\n    \\resumeItem{Implemented a custom file parser and serializer with \\textbf{unit tests} to ensure reliable save/load functionality.}\n  \\resumeItemListEnd",
    image: aiPaintImg,
    sourceUrl: "https://github.com/MananKakkar1/AI_Paint_Application",
    category: "Desktop Applications",
    technologies: "Java + JavaFX + Llama3",
    funFacts: [
      "Desktop drawing application inspired by Microsoft Paint.",
      "AI-generated images from text prompts.",
      "Responsive and intuitive user experience.",
      "Features brush selection, color palettes, and image export.",
    ],
  },
  {
    id: "custom-linux-shell",
    title: "Custom Linux Shell",
    description:
      "A custom Linux shell built using C, designed to provide a unique command-line interface and support for various shell features.",
    latex_description:
      "\\resumeProjectHeading\n  {\\textbf{Custom Linux Shell} $|$ \\emph{C, Unix Sockets, Process Management}}{}\n  \\resumeItemListStart\n    \\resumeItem{Engineered a feature-rich Linux shell supporting \\textbf{20+} commands with support for environment variables.}\n    \\resumeItem{Added support for recursive traversal and advanced navigation (e.g., \\texttt{cd ...}) to improve usability.}\n    \\resumeItem{Enabled multitasking by implementing \\textbf{background job execution} and \\textbf{command piping}.}\n    \\resumeItem{Developed a TCP socket module to support reliable \\textbf{client-server communication} with concurrent connections and sub-\\textbf{100ms} latency in LAN environments.}\n  \\resumeItemListEnd",
    image: shellImg,
    sourceUrl: "https://github.com/MananKakkar1/Custom-Linux-Shell",
    category: "System Tools",
    technologies: "C + Unix Sockets + Process Management",
    funFacts: [
      "Engineered a Linux shell from scratch in C.",
      "Supports custom commands and dynamic environment variables.",
      "Advanced functionalities like background processing and command piping.",
      "TCP socket-based communication module for server-client interactions.",
    ],
  },
  {
    id: "maze-runner-game",
    title: "Maze Runner Game",
    description:
      "A maze runner game built with python's pygame, where players navigate through a randomly generated maze to reach the finish line.",
    latex_description:
      "Developed a maze runner game in Python using Pygame, featuring randomized levels, collision detection, and progressively challenging layouts.",
    image: mazeRunnerImg,
    sourceUrl: "https://github.com/MananKakkar1/MazeRunnerGame",
    category: "Games",
    technologies: "Python + Pygame",
    funFacts: [
      "Interactive maze runner game using Python Pygame.",
      "Collision detection and player movement implemented.",
      "Multiple maze layouts and increasing difficulty levels.",
      "Optimized game performance and user controls.",
    ],
  },
  {
    id: "sokoban-game",
    title: "Sokoban Game",
    description:
      "A Sokoban game built with risc-v assembly, where players push boxes to designated locations on a board.",
    latex_description:
      "Implemented a classic Sokoban puzzle game in RISC-V Assembly, focusing on box-pushing mechanics and optimized memory/performance.",
    image: sokobanImg,
    sourceUrl: "https://github.com/MananKakkar1/Sokoban",
    category: "Games",
    technologies: "RISC-V Assembly",
    funFacts: [
      "Classic Sokoban puzzle game in RISC-V Assembly.",
      "Box-pushing mechanics and win conditions designed.",
      "Optimized memory usage and performance.",
      "Simple text-based interface for user interaction.",
    ],
  },
  {
    id: "paint-like-desktop-app",
    title: "Paintly",
    description:
      "A desktop application inspired by Microsoft Paint, allowing users to draw freely and create digital art.",
    latex_description:
      "Created a JavaFX desktop paint clone with shape tools, freehand drawing, image export, and responsive UI for digital art.",
    image: paintLikeImg,
    sourceUrl: "https://github.com/MananKakkar1/Paint_Like_Application",
    category: "Desktop Applications",
    technologies: "Java + JavaFX + CSS",
    funFacts: [
      "Desktop drawing application inspired by Microsoft Paint.",
      "Core features like freehand drawing and shape tools.",
      "Save and export artwork in various image formats.",
      "Intuitive and responsive user interface.",
    ],
  },
  {
    id: "world-population-data-extractor",
    title: "World Population Data Extractor",
    description:
      "A Python script that extracts and organizes world population data from various sources in a csv file, providing insights into global demographics.",
    latex_description:
      "Developed a Python tool for extracting, aggregating, and organizing world population data into CSV for analysis and visualization.",
    image: extractorImg,
    sourceUrl: "https://github.com/MananKakkar1/world_population_data_extractor",
    category: "Data Analysis",
    technologies: "Python + CSV",
    funFacts: [
      "Extracts and organizes world population data.",
      "Automates data aggregation and transformation.",
      "Ensures accuracy and reliability of insights.",
      "Facilitates analysis and visualization of population trends.",
    ],
  },
  {
    id: "pokemon-game",
    title: "Pokemon Game",
    description:
      "A Text based Pokemon game built with Python, where players can play through a story driven by user choices.",
    latex_description:
      "Built a text-based Pokemon adventure game in Python, featuring branching narratives, modular storylines, and replayable endings.",
    image: pokemonImg,
    sourceUrl: "https://github.com/MananKakkar1/Pokemon",
    category: "Games",
    technologies: "Python",
    funFacts: [
      "Text-based Pokemon adventure game in Python.",
      "Branching narratives and character progression.",
      "Modular codebase for easy addition of storylines.",
      "Multiple endings and decision points for replayability.",
    ],
  },
  {
    id: "othello-game",
    title: "Othello",
    description:
      "A simple terminal based Othello game built with Java, where players can play against each other or against a computer AI.",
    latex_description:
      "Designed a terminal-based Othello game in Java with player-vs-player and AI opponent modes, move validation, and a scoring system.",
    image: othelloImg,
    sourceUrl: "https://github.com/MananKakkar1/Othello",
    category: "Games",
    technologies: "Java",
    funFacts: [
      "Terminal-based Othello implementation.",
      "Features AI opponent with basic strategy.",
      "Supports two-player mode.",
      "Includes move validation and scoring system.",
    ],
  },
  {
    id: "reeldeal",
    title: "ReelDeal",
    description:
      "A full-stack movie recommendation app with JWT authentication, TMDB integration, smart recommendations, and a fast React + Vite frontend. Users can search, filter, and save favorite movies, with plans for advanced social and discovery features.",
    latex_description:
      "Created a full-stack movie discovery app with JWT auth, TMDB integration, user recommendations, and a blazing-fast React + Vite frontend.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/ReelDeal",
    category: "Websites",
    technologies:
      "React + Vite + Axios + Node.js + Express.js + MongoDB + Mongoose + JWT + TMDB API",
    funFacts: [
      "User authentication with JWT (Register/Login)",
      "Search and explore movies via TMDB API",
      "Filter movies by genre, rating, popularity, and more",
      "Save favorite movies to a personal list",
      "Smart movie recommendations based on user preferences",
      "Super-fast frontend using Vite + React",
      "RESTful API structure for scalable development",
      "Aims to add social features, advanced recommendations, and more.",
    ],
  },
  {
    id: "sales-admin-dashboard",
    title: "SalesBoard",
    description:
      "A full-stack web application for managing customers, products, and sales orders, complete with authentication, form validation, search, and pagination.",
      latex_description: "\\resumeProjectHeading\n  {\\textbf{SalesBoard} \\hfill \\emph{React, Go, SQLite, SQL, JWT}}{}\n  \\resumeItemListStart\n    \\resumeItem{Built a full-stack sales dashboard using \\textbf{React + Redux Toolkit} and a \\textbf{Go backend} with REST APIs to manage customers, products, and orders.}\n    \\resumeItem{Designed and queried a \\textbf{SQLite} database using raw \\textbf{SQL} for structured data storage and retrieval.}\n    \\resumeItem{Implemented secure \\textbf{JWT authentication}, middleware-protected routes, and Redux-based token management.}\n    \\resumeItem{Developed full \\textbf{CRUD}, \\textbf{search}, \\textbf{pagination}, and \\textbf{validation} functionalities for all modules on both frontend and backend.}\n  \\resumeItemListEnd",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/SalesBoard",
    category: "Websites",
    technologies: "React + Redux Toolkit + Go + SQLite + Emotion",
    funFacts: [
      "Full-stack sales dashboard managing customers, products, and orders with React and Go.",
      "Implements secure authentication with JWT and protects write routes via middleware.",
      "Features include searchable lists, pagination, full CRUD, and real-time form validation.",
      "Backend uses SQLite for lightweight data persistence with Go REST API support.",
    ],
  },
  {
    id: "netly",
    title: "Netly",
    description:
      "A local basketball analytics tool that uses YOLO and OpenCV to detect players, track ball possession, and flag violations in real time. Features live overlays, video analysis, and a React + Flask interface, all running locally.",
    latex_description:
      "\\resumeProjectHeading\n  {\\textbf{Netly} $|$ React, Flask, OpenCV, YOLOv5, MongoDB, Python}{SpurHacks Hackathon}\n  \\resumeItemListStart\n    \\resumeItem{Developed an \\textbf{AI}-powered basketball analysis system during SpurHacks to detect traveling violations and track ball possession in \\textbf{real-time} from live and recorded footage.}\n    \\resumeItem{Used \\textbf{YOLOv5} and OpenCV to track players, estimate poses, and detect basketball movement.}\n    \\resumeItem{Built a web interface with React and Flask to visualize analysis overlays and session results.}\n    \\resumeItem{Implemented a \\textbf{MongoDB + JWT}-based login system with session and role management.}\n  \\resumeItemListEnd",
    image: netlyImg,
    sourceUrl: "https://github.com/MananKakkar1/Netly",
    category: "Data Analysis",
    technologies: "Python + React + Node.js + Flask + YOLO + OpenCV",
    funFacts: [
      "Real-time player and basketball detection using YOLO and pose estimation.",
      "Tracks ball possession and flags traveling violations live.",
      "Video analysis mode detects passes, interceptions, traveling, and double dribbles with timestamps.",
      "Live overlays with bounding boxes, keypoints, and stats using OpenCV.",
      "Easy-to-use React frontend and Flask backend, runs entirely locally.",
    ],
  },
  {
    id: "github-discord-bot",
    title: "Commit Tracker Bot",
    description:
      "A Discord bot that tracks and displays the total number of commits for a given GitHub repository. Useful for teams and communities to monitor project activity directly from Discord.",
    latex_description:
      "Built a Discord bot using Node.js to track and display real-time commit counts for any GitHub repository in Discord servers.",
    image: githubDiscordBotImg,
    sourceUrl: "https://github.com/MananKakkar1/github-discord-bot",
    category: "Bots",
    technologies: "Node.js + Discord.js + GitHub API",
    funFacts: [
      "Tracks GitHub repository commits in real-time.",
      "Integrates seamlessly with Discord servers.",
    ],
  },
  {
    id: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    description:
      "A web app for visualizing sorting, searching, and graph algorithms. Users can step through algorithm execution, adjust data, and learn core concepts interactively through animated visualizations.",
    latex_description:
      "Created an interactive algorithm visualizer for sorting, searching, and graph algorithms with step-by-step controls and educational UI.",
    image: tempImg,
    sourceUrl: "https://github.com/MananKakkar1/Algorithm-Visualizer",
    category: "Websites",
    technologies: "JavaScript + HTML + CSS",
    funFacts: [
      "Visualizes sorting, searching, and graph algorithms.",
      "Interactive controls for step-by-step execution and data adjustment.",
      "Educational tool for learning algorithm fundamentals.",
    ],
  },
];


const getCategories = () => {
  const cats = Array.from(new Set(projectsList.map((p) => p.category)));
  return ["All", ...cats];
};

const parseTechnologies = (techString: string): string[] => {
  return techString
    .split("+")
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);
};

const GitHubIcon = () => (
  <svg
    className="github-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Projects = () => {
  const [selected, setSelected] = useState("All");
  const categories = getCategories();
  const filteredProjects =
    selected === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === selected);

  // Track fun fact index for each project by id
  const [funFactIndexes, setFunFactIndexes] = useState<{
    [id: string]: number;
  }>({});

  // Handler to cycle fun facts (update to allow up/right = next, down/left = previous)
  const handleDpad = (
    projectId: string,
    direction: "up" | "down" | "left" | "right"
  ) => {
    setFunFactIndexes((prev) => {
      const project = filteredProjects.find((p) => p.id === projectId);
      if (!project || !project.funFacts || project.funFacts.length === 0)
        return prev;
      const current = prev[projectId] || 0;
      let next = current;
      if (direction === "right" || direction === "up") {
        next = (current + 1) % project.funFacts.length;
      } else if (direction === "left" || direction === "down") {
        next =
          (current - 1 + project.funFacts.length) % project.funFacts.length;
      }
      return { ...prev, [projectId]: next };
    });
  };

  return (
    <div className="projects-page-background">
      <h1>My Projects</h1>
      <div className="category-filter">
        <span className="filter-label">Filter by category:</span>
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selected === cat ? "active" : ""}`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-entry">
            <div className="gameboy-lines">
              <div className="gameboy-line"></div>
              <div className="gameboy-line"></div>
              <div className="gameboy-line"></div>
            </div>
            <div className="gameboy-screen">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
              />
            </div>
            <h3>{project.title}</h3>
            <div className="gameboy-controls">
              <div className="tech-stack">
                {parseTechnologies(project.technologies).map((tech, index) => (
                  <button key={index} className="tech-badge" title={tech}>
                    {tech}
                  </button>
                ))}
              </div>

              <div className="gameboy-dpad">
                <div className="dpad">
                  <div className="dpad-horizontal"></div>
                  <div className="dpad-vertical"></div>
                  <div className="dpad-center"></div>
                  <div
                    className="dpad-up"
                    onClick={() => handleDpad(project.id, "up")}
                    title="Previous Fun Fact"
                  ></div>
                  <div
                    className="dpad-down"
                    onClick={() => handleDpad(project.id, "down")}
                    title="Next Fun Fact"
                  ></div>
                  <div
                    className="dpad-left"
                    onClick={() => handleDpad(project.id, "left")}
                    title="Previous Fun Fact"
                  ></div>
                  <div
                    className="dpad-right"
                    onClick={() => handleDpad(project.id, "right")}
                    title="Next Fun Fact"
                  ></div>
                </div>

                <div className="action-buttons">
                  <a
                    href={`/projects/${project.id}`}
                    className="action-button"
                    title="View Project Details"
                  >
                    INFO
                  </a>
                  <a
                    href={project.sourceUrl}
                    className="action-button"
                    target="_blank"
                    title="View Source Code"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
              {/* Fun Fact Display */}
              {project.funFacts && project.funFacts.length > 0 && (
                <div className="fun-fact">
                  💡 {project.funFacts[funFactIndexes[project.id] || 0]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
export { projectsList };
