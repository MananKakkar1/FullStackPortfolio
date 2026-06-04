"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/css_files/Projects.css";
import { useScrollTypewriter } from "../hooks/useScrollTypewriter";

import chessImg from "../assets/chess-pic.png";
import portfolioImg from "../assets/portfolio2.png";
import fileSystemImg from "../assets/file-system-tree.png";
import aiPaintImg from "../assets/ai-paint.png";
import sokobanImg from "../assets/sokoban.png";
import othelloImg from "../assets/Othello.png";
import shellImg from "../assets/shell.png";
import netlyImg from "../assets/Netly.png";
import etaImg from "../assets/ETA.png";
import algoImg from "../assets/AlgoVisualize.png";
import salesImg from "../assets/SalesBoard.png";
import reelImg from "../assets/ReelDeal.png";
import clImg from "../assets/cl.png";

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
    description: "A browser-based chess game with 4 AI difficulty modes, Stockfish and GPT integration, and async communication to reduce AI response time by 30%.",
    latex_description: "Built a browser-based chess game with 4 AI difficulty modes, Stockfish and GPT integration, and async communication to reduce AI response time by 30%.",
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
    description: "Modern React and TypeScript portfolio site with dynamic contact forms, responsive design, and a custom Node.js backend for email delivery.",
    latex_description: "Developed a modern React and TypeScript portfolio site with dynamic contact forms, responsive design, and a custom Node.js backend for email delivery.",
    image: portfolioImg,
    sourceUrl: "https://github.com/MananKakkar1/FullStackPortfolio",
    category: "Websites",
    technologies: "React + TypeScript + Vite + Node.js + Express.js + Nodemailer",
    funFacts: [
      "Responsive and interactive design.",
      "Dynamic email sending from the Contact Me page.",
      "Lightweight Node.js + Express.js backend.",
      "Utilizes Git for version control.",
    ],
  },
  {
    id: "reeldeal",
    title: "ReelDeal",
    description: "Full-stack movie discovery app with JWT auth, TMDB integration, user recommendations, and a blazing-fast React + Vite frontend.",
    latex_description: "Created a full-stack movie discovery app with JWT auth, TMDB integration, user recommendations, and a blazing-fast React + Vite frontend.",
    image: reelImg,
    sourceUrl: "https://github.com/MananKakkar1/ReelDeal",
    category: "Websites",
    technologies: "React + Vite + Axios + Node.js + Express.js + MongoDB + Mongoose + JWT + TMDB API",
    funFacts: [
      "User authentication with JWT (Register/Login)",
      "Search and explore movies via TMDB API",
      "Filter movies by genre, rating, popularity, and more",
      "Save favorite movies to a personal list",
    ],
  },
  {
    id: "sales-admin-dashboard",
    title: "SalesBoard",
    description: "Real-time sales and inventory platform with Go APIs, React, and SQLite; Server-Sent Events for live updates; JWT authentication and full CRUD workflows.",
    latex_description: "Developed a real-time sales and inventory platform with Go APIs, React, and SQLite; integrated Server-Sent Events for live dashboard updates with filtering and pagination; implemented secure JWT authentication and full CRUD workflows across customers, products, and orders.",
    image: salesImg,
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
    description: "AI-powered basketball analytics pipeline using YOLOv5 and OpenCV for real-time travel detection and possession tracking, with a React and Flask playback dashboard.",
    latex_description: "Built an AI-powered basketball analysis pipeline using YOLOv5 and OpenCV for real-time travel detection and possession tracking; implemented a React and Flask playback dashboard with timeline overlays; architected an extensible processing workflow with MongoDB and JWT authentication.",
    image: netlyImg,
    sourceUrl: "https://github.com/MananKakkar1/Netly",
    category: "Data Analysis",
    technologies: "Python + React + Node.js + Flask + YOLO + OpenCV",
    funFacts: [
      "Real-time player and basketball detection using YOLO and pose estimation.",
      "Tracks ball possession and flags traveling violations live.",
      "Video analysis mode detects passes, interceptions, traveling, and double dribbles with timestamps.",
      "Easy-to-use React frontend and Flask backend, runs entirely locally.",
    ],
  },
  {
    id: "eta",
    title: "ETA",
    description: "Won Best Use of Auth0 at EmberHacks — an interactive AI learning assistant with DynamoDB for persistent context, voice pipeline with Gemini and ElevenLabs.",
    latex_description: "Won Best Use of Auth0 at EmberHacks for building an interactive AI learning assistant; integrated DynamoDB for persistent user context and multi-turn personalization; built a voice pipeline with Gemini and ElevenLabs plus AI-driven visual response flows.",
    image: etaImg,
    sourceUrl: "https://github.com/MananKakkar1/ETA",
    category: "Websites",
    technologies: "React + Flask + DynamoDB + Gemini API + ElevenLabs",
    funFacts: ["First Hackathon Win", "Custom Animations", "AI Voice Assistant"],
  },
  {
    id: "continulearn",
    title: "ContinuLearn",
    description: "Browser-based 3D continuum robot simulator with Unity WebGL in Next.js; real-time controls for bend angle and direction; Gemini coaching and ElevenLabs voice feedback.",
    latex_description: "Built a browser-based 3D continuum robot simulator with Unity WebGL embedded in a Next.js app; implemented constant-curvature modeling with real-time controls for bend angle, radius, and direction; integrated Gemini coaching and ElevenLabs voice feedback for interactive learning.",
    image: clImg,
    sourceUrl: "https://github.com/MananKakkar1/ContinuLearn",
    category: "Websites",
    technologies: "Next.js + Unity WebGL + C# + TypeScript + Gemini API + ElevenLabs + SQLite",
    funFacts: [
      "Designed around ongoing, structured learning workflows.",
      "Represents a dedicated education-focused repository on your profile.",
    ],
  },
  {
    id: "custom-linux-shell",
    title: "Custom Linux Shell",
    description: "Linux shell in C with parsing, pipelines, redirection, and background jobs; AI-powered CLI workflow; built-in TCP chat server supporting 200+ clients.",
    latex_description: "Built a Linux shell in C with parsing, pipelines, redirection, background jobs, and environment variable expansion; integrated an AI-powered CLI workflow for deterministic command support; engineered a built-in TCP chat server supporting 200+ clients and high-throughput messaging.",
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
    id: "ai-paint-desktop-app",
    title: "SmartPaint",
    description: "JavaFX paint application with shape tools and structured JSON workflows; integrated Llama 3 and OpenAI models for prompt-to-drawing; FSM-based parser with JUnit5 test coverage.",
    latex_description: "Built a JavaFX paint application with shape tools, color controls, and structured JSON workflows; integrated Llama 3 and OpenAI models for intelligent prompt-to-drawing generation; implemented an FSM-based parser for high-volume command handling with strong JUnit5 test coverage.",
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
    id: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    description: "Interactive algorithm visualizer for sorting, searching, and graph algorithms with step-by-step controls and educational UI.",
    latex_description: "Created an interactive algorithm visualizer for sorting, searching, and graph algorithms with step-by-step controls and educational UI.",
    image: algoImg,
    sourceUrl: "https://github.com/MananKakkar1/Algorithm-Visualizer",
    category: "Websites",
    technologies: "JavaScript + HTML + CSS",
    funFacts: [
      "Visualizes sorting, searching, and graph algorithms.",
      "Interactive controls for step-by-step execution and data adjustment.",
      "Educational tool for learning algorithm fundamentals.",
    ],
  },
  {
    id: "file-system-tree-visualizer",
    title: "File System Tree Visualizer",
    description: "Hierarchical file system visualizer in Python using Pygame; supports real-time rendering, CSV data parsing, and interactive exploration.",
    latex_description: "Visualized hierarchical file system structures in Python using Pygame; supports real-time rendering, CSV data parsing, and interactive exploration.",
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
    id: "sokoban-game",
    title: "Sokoban",
    description: "Sokoban puzzle game in RISC-V assembly with multiplayer support and dynamic 127x127 grids; randomized board generation with solvable puzzles.",
    latex_description: "Built a Sokoban puzzle game in RISC-V assembly with multiplayer support and dynamic 127x127 grids; designed randomized board generation with solvable puzzles and efficient move storage; engineered restart and reset flows for consistent gameplay correctness.",
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
    id: "othello-game",
    title: "Othello",
    description: "Terminal-based Othello game in Java with player-vs-player and AI opponent modes, move validation, and a scoring system.",
    latex_description: "Designed a terminal-based Othello game in Java with player-vs-player and AI opponent modes, move validation, and a scoring system.",
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
];

const CATEGORIES = ["All", "Websites", "Games", "System Tools", "Data Analysis", "Desktop Applications"];

// Scrollytelling panel for one project
const ProjectPanel = ({ project, index }: { project: Project; index: number }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, displayed: titleText } = useScrollTypewriter(project.title, 45);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          panelRef.current?.classList.add("panel-visible");
          imgRef.current?.classList.add("img-visible");
        }
      },
      { threshold: 0.15 }
    );
    if (panelRef.current) observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  const techList = project.technologies
    .split("+")
    .map((t) => t.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <div className="project-panel" ref={panelRef}>
      <div className="panel-left">
        <span className="panel-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2
          className="panel-title"
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
        >
          {titleText}
          <span className="cursor" style={{ opacity: titleText.length > 0 && titleText.length < project.title.length ? 1 : 0 }} />
        </h2>
        <span className="panel-category">{project.category}</span>
        <p className="panel-desc">{project.description}</p>
        <p className="panel-tech">{techList}</p>
        <div className="panel-links">
          <Link to={`/projects/${project.id}`} className="panel-link">
            Details →
          </Link>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="panel-link"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
      <div className="panel-divider" />
      <div className="panel-right">
        <div className="panel-img-wrap" ref={imgRef}>
          <img src={project.image} alt={project.title} />
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState("All");
  const { ref: headRef, displayed: headText } = useScrollTypewriter("Projects.", 55);

  const filtered =
    selected === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === selected);

  return (
    <div className="projects-root">
      <div className="projects-header">
        <h1
          className="projects-main-heading"
          ref={headRef as React.RefObject<HTMLHeadingElement>}
        >
          {headText}
          <span className="cursor" style={{ opacity: headText.length > 0 && headText.length < "Projects.".length ? 1 : 0 }} />
        </h1>
        <p className="projects-sub">
          {projectsList.length} projects across full-stack, systems, AI, and games.
        </p>
      </div>

      <div className="category-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`cat-tab${selected === cat ? " active" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-panels">
        {filtered.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
export { projectsList };
