// Single source of truth for site content.
// Projects also feed the /work/:id detail route.

import chessImg from "../assets/chess-pic.png";
import reelImg from "../assets/ReelDeal.png";
import salesImg from "../assets/SalesBoard.png";
import netlyImg from "../assets/Netly.png";
import etaImg from "../assets/ETA.png";
import continuLearnImg from "../assets/cl.png";
import shellImg from "../assets/shell.png";
import smartPaintImg from "../assets/ai-paint.png";
import algoImg from "../assets/AlgoVisualize.png";
import fileTreeImg from "../assets/file-system-tree.png";
import sokobanImg from "../assets/sokoban.png";
import othelloImg from "../assets/Othello.png";

export const profile = {
  name: "Manan Kakkar",
  location: "Oakville, Ontario",
  email: "manan.kakkar.2005@outlook.com",
  kicker: "Software Engineer Intern · AMD · UofT CS",
  heroLine:
    "CS student at the University of Toronto and Software Engineer Intern on AMD's Software Infrastructure team, building practical, impactful software across the full stack.",
  aboutBio: [
    "Computer Science student at the University of Toronto. I build software that makes a real difference: clean backends, fast frontends, and AI-powered tools that ship.",
    "Competed at SpurHacks and EmberHacks (1st place), interned at Munafah.AI, and currently a Software Engineer Intern on AMD's Software Infrastructure team.",
  ],
};

export const socials = [
  { label: "GitHub", handle: "MananKakkar1", url: "https://github.com/MananKakkar1" },
  {
    label: "LinkedIn",
    handle: "in/manankakkar11",
    url: "https://www.linkedin.com/in/manankakkar11/",
  },
  { label: "Email", handle: profile.email, url: `mailto:${profile.email}` },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const facts = [
  { label: "Current Role", value: "Software Engineer Intern · AMD Software Infrastructure" },
  { label: "Work Style", value: "Iterative and practical" },
  { label: "Strengths", value: "Backend + product mindset" },
  { label: "Current Chapter", value: "UofT CS + AMD internship" },
];

export const experience = [
  {
    company: "AMD",
    role: "Software Engineer Intern, Software Infrastructure",
    place: "Markham, Ontario",
    period: "May 2026 - Aug 2027",
    summary: "Full-stack work on the Software Infrastructure team.",
    points: [
      "Build full-stack features for internal engineering tools serving 2,600+ daily users with C#, .NET, Angular, and TypeScript.",
      "Model relational data in SQL Server and build Power BI dashboards that surface engineering metrics to stakeholders.",
      "Ship AI and LLM integrations and MCP servers on Azure, backed by unit and integration tests to cut regressions.",
    ],
  },
  {
    company: "Munafah.AI",
    role: "Software Engineer Intern",
    place: "Remote",
    period: "May 2025 - Aug 2025",
    summary:
      "Backend and AI-moderation work for a real-time B2B messaging platform.",
    points: [
      "Built and deployed backend systems for a real-time B2B messaging platform using Node.js, Flask, and Firestore.",
      "Developed AI-assisted moderation workflows for real-time communication, working with production AI pipelines.",
      "Wrote unit and integration tests to support stable deployments and production reliability.",
      "Set up CI/CD workflows and deployment processes that improved release quality and velocity.",
    ],
  },
  {
    company: "University of Toronto Mississauga",
    role: "CSC476: Introduction to Continuum Robotics",
    place: "Mississauga, Ontario",
    period: "2025",
    summary:
      "Read and presented research on continuum robot kinematics, planning, and control.",
    points: [
      "Presented on the multi-solution inverse kinematics solver for 3-section constant-curvature robots, from an archaeology-focused angle.",
      "Co-presented on improved state parametrization for soft robots with piecewise constant curvature and its use in model-based control.",
      "Co-presented on model-based control of soft robots.",
      "Studied how tendon-driven continuum robots are modelled and how piecewise constant-curvature formulations are used in analysis and control.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "C", "C++", "Java", "C#", "Go", "TypeScript", "JavaScript", "Bash"],
  },
  {
    title: "Robotics & Simulation",
    items: [
      "Franka Emika Panda",
      "Inverse kinematics",
      "Constant-curvature modeling",
      "Trajectory generation",
      "Real-time control",
      "Unity / Unity WebGL",
    ],
  },
  {
    title: "AI & Vision",
    items: ["OpenCV", "YOLOv5", "Google Vision", "Gemini API", "ElevenLabs"],
  },
  {
    title: "Web & Backend",
    items: ["Next.js", "React", "Flask", "Express.js", "REST APIs", "Firebase", "PostgreSQL", "MongoDB", "JWT"],
  },
  {
    title: "Systems & Infra",
    items: ["Linux", "Git", "GitHub Actions", "Unix sockets", "Process management", "CI/CD"],
  },
  {
    title: "Testing & Debugging",
    items: ["GDB", "Valgrind", "PyTest", "JUnit5", "Jest"],
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  image?: string;
  placeholderSeed?: string;
  sourceUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "copycadder",
    title: "CopyCadder",
    year: "2025",
    category: "Robotics",
    summary: "Robotic handwriting on a Franka Emika Panda arm.",
    description:
      "A robotics pipeline that turns input characters into executable motion commands for a Franka Emika Panda arm. Character shapes become smooth geometric writing trajectories that the arm physically executes.",
    stack: ["Python", "Franka Emika Panda", "Trajectory generation", "Inverse kinematics"],
    highlights: [
      "Converts arbitrary input characters into robot motion commands.",
      "Generates smooth geometric writing trajectories for physical execution.",
      "End to end, from character shape to arm movement.",
    ],
    placeholderSeed: "copycadder-panda-arm",
  },
  {
    id: "continulearn",
    title: "ContinuLearn",
    year: "2025",
    category: "Robotics",
    summary: "Browser-based 3D continuum robot simulator.",
    description:
      "A browser 3D continuum robot simulator that embeds three Unity WebGL builds with Blender assets inside a Next.js app. It implements constant-curvature kinematics and a three-track roadmap unlocked by automated parameter checks, with KaTeX theory lessons and AI coaching over Gemini and ElevenLabs on a Turso and SQLite layer with Auth0 sessions.",
    stack: ["Next.js", "Unity WebGL", "C#", "TypeScript", "Gemini", "ElevenLabs", "Turso", "SQLite", "Auth0"],
    highlights: [
      "Embeds three Unity WebGL builds with Blender assets in a Next.js app.",
      "Constant-curvature kinematics with a three-track roadmap gated by automated parameter checks.",
      "KaTeX theory lessons alongside the simulator.",
      "AI coaching over Gemini and ElevenLabs on a Turso and SQLite layer with Auth0 sessions.",
    ],
    liveUrl: "https://continu-learn.vercel.app",
    sourceUrl: "https://github.com/MananKakkar1/ContinuLearn",
    image: continuLearnImg,
    featured: true,
  },
  {
    id: "sportsdeck",
    title: "SportsDeck",
    year: "2025",
    category: "Full-stack",
    summary: "Sports community platform with forums, polls, and a sentiment pipeline.",
    description:
      "A sports community platform built with Next.js, PostgreSQL with Prisma, and Redis. It has forums, polls, follow graphs, admin moderation, and Cloudinary uploads, plus a Hugging Face sentiment pipeline running on cron jobs. The API is documented in OpenAPI and Postman, and it ships with Docker Compose and Jest. This project was given special distinction and rated the best in the class.",
    stack: ["Next.js", "React", "PostgreSQL", "Prisma", "Redis", "Docker", "Jest"],
    highlights: [
      "Given special distinction and rated the best in the class.",
      "Forums, polls, follow graphs, and admin moderation with Cloudinary uploads.",
      "Hugging Face sentiment pipeline running on cron jobs.",
      "API documented in OpenAPI and Postman.",
      "Ships with Docker Compose and Jest.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/SportsDeck",
    placeholderSeed: "sportsdeck-community",
    featured: true,
  },
  {
    id: "custom-linux-shell",
    title: "Custom Linux Shell",
    year: "2024",
    category: "Systems",
    summary: "A Bash-like shell in C with an AI CLI and a TCP chat server.",
    description:
      "A Bash-like shell written in C: a tokenizing parser, pipelines, I/O redirection, background jobs, environment expansion, and built-ins. Processes are managed with fork() and execvp() plus PATH resolution, with SIGINT and SIGTSTP handlers for graceful interrupts. It is extended with an AI-powered CLI over GPT 5 and a built-in TCP chat server for real-time client messaging.",
    stack: ["C", "POSIX", "Unix sockets", "Process management"],
    highlights: [
      "Tokenizing parser with pipelines, I/O redirection, background jobs, environment expansion, and built-ins.",
      "fork() and execvp() process management with PATH resolution and SIGINT / SIGTSTP handlers.",
      "AI-powered CLI over GPT 5.",
      "Built-in TCP chat server for real-time client messaging.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Custom-Linux-Shell",
    image: shellImg,
    featured: true,
  },
  {
    id: "aira",
    title: "AIRA",
    year: "2025",
    category: "AI",
    summary: "Human-in-the-loop incident response assistant.",
    description:
      "An incident response assistant that speeds up triage and investigation of cybersecurity alerts. It uses machine learning and real-time analysis to support analyst decision-making and anomaly detection while keeping a human in the loop.",
    stack: ["Python", "Machine learning", "Real-time analysis"],
    highlights: [
      "Faster triage and investigation of security alerts.",
      "ML and real-time analysis assist analyst decisions.",
      "Human-in-the-loop by design.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Auto-Incident-Response-Assistant",
    placeholderSeed: "aira-security-ops",
  },
  {
    id: "netly",
    title: "Netly",
    year: "2025",
    category: "AI",
    summary: "AI basketball review app that scores training sessions.",
    description:
      "An AI basketball review app built with React, Flask, and OpenCV. It scores training sessions on visibility, focus, activity, and stability. Built at Spurhacks.",
    stack: ["React", "Flask", "OpenCV", "Python"],
    highlights: [
      "Scores sessions on visibility, focus, activity, and stability.",
      "Computer vision analysis with OpenCV.",
      "React and Flask app, built at Spurhacks.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Netly",
    image: netlyImg,
    featured: true,
  },
  {
    id: "eta",
    title: "ETA",
    year: "2025",
    category: "AI",
    summary: "Best Use of Auth0 winner. An interactive AI learning assistant.",
    description:
      "An interactive AI learning assistant that won Best Use of Auth0 and finished Top 4 at EmberHacks 2025. DynamoDB holds persistent user context for multi-turn personalization, with a voice pipeline built on Gemini and ElevenLabs plus AI-driven visual responses.",
    stack: ["React", "Flask", "DynamoDB", "Gemini API", "ElevenLabs", "Auth0"],
    highlights: [
      "Won Best Use of Auth0, Top 4 overall at EmberHacks 2025.",
      "DynamoDB-backed persistent context for multi-turn personalization.",
      "Voice pipeline with Gemini and ElevenLabs.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/ETA",
    image: etaImg,
  },
  {
    id: "salesboard",
    title: "SalesBoard",
    year: "2024",
    category: "Full-stack",
    summary: "Real-time sales and inventory platform with Go APIs.",
    description:
      "A real-time sales and inventory platform with Go APIs, React, and SQLite. Server-Sent Events drive live dashboard updates with filtering and pagination; JWT auth protects full CRUD workflows across customers, products, and orders.",
    stack: ["React", "Redux Toolkit", "Go", "SQLite", "Emotion"],
    highlights: [
      "Server-Sent Events for live dashboard updates.",
      "JWT auth with middleware-protected write routes.",
      "Searchable lists, pagination, full CRUD, real-time validation.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/SalesBoard",
    image: salesImg,
  },
  {
    id: "reeldeal",
    title: "ReelDeal",
    year: "2024",
    category: "Full-stack",
    summary: "Full-stack movie discovery app with JWT auth and TMDB.",
    description:
      "A movie discovery app with JWT authentication, TMDB integration, and user recommendations, on a React and Vite frontend backed by Node, Express, and MongoDB.",
    stack: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "JWT", "TMDB API"],
    highlights: [
      "JWT register and login flow.",
      "Search and filter movies by genre, rating, and popularity.",
      "Personal favorites list.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/ReelDeal",
    image: reelImg,
  },
  {
    id: "chess-game",
    title: "Chess Game",
    year: "2023",
    category: "Full-stack",
    summary: "Browser chess with 4 AI modes, Stockfish, and GPT.",
    description:
      "A browser-based chess game with four AI difficulty modes, Stockfish and GPT integration, and async communication that cut AI response time by roughly 30 percent.",
    stack: ["JavaScript", "HTML", "CSS", "Python", "Flask"],
    highlights: [
      "Four AI difficulty modes.",
      "Stockfish and GPT-based engine.",
      "Async communication reduces AI response time by about 30 percent.",
      "15+ JavaScript unit tests.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Chess_Game",
    image: chessImg,
  },
  {
    id: "smartpaint",
    title: "SmartPaint",
    year: "2023",
    category: "Desktop",
    summary: "JavaFX paint app with prompt-to-drawing AI.",
    description:
      "A JavaFX paint application with shape tools, color controls, and structured JSON workflows. Llama 3 and OpenAI models drive prompt-to-drawing generation, and an FSM-based parser handles high-volume command input with JUnit5 coverage.",
    stack: ["Java", "JavaFX", "Llama 3", "OpenAI"],
    highlights: [
      "Prompt-to-drawing generation with Llama 3 and OpenAI.",
      "FSM-based command parser with strong JUnit5 coverage.",
      "Brush selection, color palettes, and image export.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/AI_Paint_Application",
    image: smartPaintImg,
  },
  {
    id: "sokoban",
    title: "Sokoban",
    year: "2024",
    category: "Systems",
    summary: "Sokoban in RISC-V assembly with multiplayer.",
    description:
      "A Sokoban puzzle game written in RISC-V assembly, with multiplayer support and dynamic 127x127 grids. Randomized board generation always produces solvable puzzles, with efficient move storage and restart and reset flows.",
    stack: ["RISC-V Assembly"],
    highlights: [
      "Box-pushing mechanics and win conditions in pure assembly.",
      "Randomized, always-solvable board generation.",
      "Optimized memory usage and move storage.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Sokoban",
    image: sokobanImg,
  },
  {
    id: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    year: "2023",
    category: "Full-stack",
    summary: "Step-by-step sorting, searching, and graph visualizer.",
    description:
      "An interactive visualizer for sorting, searching, and graph algorithms, with step-by-step controls and an education-focused UI.",
    stack: ["JavaScript", "HTML", "CSS"],
    highlights: [
      "Sorting, searching, and graph algorithms.",
      "Step-by-step execution and adjustable data.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Algorithm-Visualizer",
    image: algoImg,
  },
  {
    id: "file-system-tree-visualizer",
    title: "File System Tree Visualizer",
    year: "2023",
    category: "Systems",
    summary: "Hierarchical file system visualizer in Pygame.",
    description:
      "A Python and Pygame tool that renders hierarchical file system structures in real time, parsing CSV data and supporting interactive expand and collapse exploration.",
    stack: ["Python", "Pygame"],
    highlights: [
      "Real-time parsing and rendering.",
      "Interactive expand and collapse.",
      "Visualizes CSV data as a file tree.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/File-System-Tree-Visualizer",
    image: fileTreeImg,
  },
  {
    id: "othello",
    title: "Othello",
    year: "2023",
    category: "Systems",
    summary: "Terminal Othello in Java with an AI opponent.",
    description:
      "A terminal-based Othello game in Java with player-vs-player and AI opponent modes, move validation, and a scoring system.",
    stack: ["Java"],
    highlights: [
      "AI opponent with basic strategy.",
      "Two-player mode.",
      "Move validation and scoring.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Othello",
    image: othelloImg,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const railProjects = projects.filter((p) => !p.featured);

export function projectImage(p: Project): string {
  if (p.image) return p.image;
  const seed = p.placeholderSeed ?? p.id;
  return `https://picsum.photos/seed/${seed}/1200/800?grayscale`;
}
