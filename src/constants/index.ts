// Single source of truth for site content.
// Projects also feed the /work/:id detail route.

import cadpilotImg from "../assets/cadpilot.webp";
import copycadderImg from "../assets/copycadder.webp";
import sportsdeckImg from "../assets/sportsdeck.webp";
import netlyImg from "../assets/netly.webp";
import cadpilotThumb from "../assets/cadpilot-thumb.webp";
import sportsdeckThumb from "../assets/sportsdeck-thumb.webp";
import continuLearnThumb from "../assets/continulearn-thumb.webp";
import etaImg from "../assets/ETA.png";
import continuLearnImg from "../assets/continulearn.webp";
import shellImg from "../assets/shell.png";
import salesImg from "../assets/SalesBoard.png";
import sokobanImg from "../assets/sokoban.png";

export const profile = {
  name: "Manan Kakkar",
  location: "Toronto, Ontario",
  email: "manan.kakkar.2005@outlook.com",
  kicker: "SWE Intern · Research Assistant · University of Toronto CS Specialist",
  heroLine:
    "CS student at the University of Toronto, Software Engineer Intern at AMD, and Robotics Research Assistant at the Continuum Robotics Lab, building practical, impactful software from the browser down to the robot.",
  aboutBio: [
    "Computer Science Specialist at the University of Toronto. I build software that makes a real difference: clean backends, fast frontends, AI-powered tools that ship, and increasingly, software that moves robots.",
    "Currently a Software Engineer Intern at AMD and a Robotics Research Assistant at the Continuum Robotics Lab, and building Vullpine, a browser-based platform for designing, simulating, and testing robots. Before that I interned with Munafah.AI and won Best Use of Auth0 at EmberHacks.",
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
  {
    label: "Current Roles",
    value: "Software Engineer Intern at AMD · Robotics Research Assistant at the Continuum Robotics Lab",
  },
  { label: "Building", value: "Vullpine, a browser-based robotics development platform" },
  {
    label: "Research",
    value: "Continuum robotics: tendon-driven robots, kinematics, motion planning, and control",
  },
  { label: "Education", value: "HBSc Computer Science Specialist, University of Toronto · 2028" },
];

export type ExperienceItem = {
  company: string;
  role: string;
  place: string;
  period: string;
  summary?: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Continuum Robotics Lab, University of Toronto",
    role: "Robotics Research Assistant",
    place: "Mississauga, Ontario",
    period: "2026 - Present",
    points: [],
  },
  {
    company: "AMD",
    role: "Software Engineer Intern",
    place: "Markham, Ontario",
    period: "May 2026 - Present",
    summary: "Full-stack and AI tooling on the Software Infrastructure team.",
    points: [
      "Developed full-stack features for a test management platform serving 2,600+ daily users using C# / .NET, Angular, and TypeScript.",
      "Developed an AI agent harness from scratch and integrated MCP servers to enable LLM-powered workflows across internal engineering tools.",
      "Led platform demos with 10+ engineering teams, helping developers understand workflows and adopt the platform for more effective test management.",
    ],
  },
  {
    company: "Vullpine",
    role: "Founder & Lead Architect",
    place: "Remote",
    period: "May 2026 - Present",
    summary: "A full-stack robotics platform for designing, simulating, testing, and developing robots.",
    points: [
      "Building a full-stack robotics platform that lets engineers design, simulate, test, and develop robot projects through browser-based ROS 2 tools, interactive challenges, and organization workspaces.",
      "Building and deploying production systems for in-browser robot simulation, asynchronous code judging, authentication, RBAC, community features, and enterprise workspaces.",
      "Developing an agentic robotics development lifecycle spanning robot description, simulation, software testing, and deployment to physical hardware.",
    ],
  },
  {
    company: "The Linux Foundation",
    role: "Open Source Contributor",
    place: "Remote",
    period: "2026 - Present",
    points: [],
  },
  {
    company: "University of Toronto × Munafah.AI",
    role: "Software Engineer Intern",
    place: "Remote",
    period: "May 2025 - Aug 2025",
    summary: "Industry partnership: backend and AI moderation for a real-time B2B messaging platform.",
    points: [
      "Built and deployed backend services (Node.js, Flask) with Firestore to support real-time messaging between businesses on a B2B platform.",
      "Built an AI moderation pipeline that reduced manual message review time by 65%, and implemented automated testing with 100% test coverage to improve release reliability.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["C", "C++", "C#", "Python", "Java", "Bash", "JavaScript / TypeScript", "Go", "SQL"],
  },
  {
    title: "Robotics",
    items: [
      "ROS 2",
      "Franka Emika Panda",
      "Ruckig",
      "Constant-curvature kinematics",
      "SE(3) trajectories",
      "Robot simulation",
    ],
  },
  {
    title: "Frameworks & APIs",
    items: [".NET", "Angular", "React", "Next.js", "Express.js", "Flask", "Unity WebGL", "OpenCV"],
  },
  {
    title: "Data & Systems",
    items: [
      "PostgreSQL",
      "Prisma",
      "SQL Server",
      "Redis",
      "Docker",
      "Azure",
      "Linux",
      "Git",
      "GDB",
      "Valgrind",
    ],
  },
  {
    title: "Testing & AI",
    items: ["Playwright", "Jest", "PyTest", "LLM Evaluation", "Multi-Agent Systems", "MCP"],
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
  image: string;
  /** Tighter crop for small cards; falls back to `image`. */
  thumb?: string;
  sourceUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: "cadpilot",
    title: "CADPilot",
    year: "2026",
    category: "AI · CAD",
    summary: "Agentic CAD that turns a design brief into a validated, editable OpenCascade BREP.",
    description:
      "CADPilot is an agentic CAD workbench that turns a design brief into a validated, editable OpenCascade BREP. Each project keeps the full engineering record around every result: the original prompt, structured intent, parametric plan, generated Replicad source, validation report, preview mesh, STEP and STL exports, an audit log, and the conversation that explains each revision. It is a Next.js 15 and React 19 app on PostgreSQL with Prisma, with CAD generation running in a separate Node.js worker and build events streamed live to the workbench over Server-Sent Events.",
    stack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "Replicad", "OpenCascade", "Gemini", "Chili3D"],
    highlights: [
      "Agent pipeline: intent extraction in millimetres, parametric planning, and Replicad code generation against a verified API reference.",
      "Generated code runs in a hardened Node VM with imports, networking, process access, timers, and dynamic evaluation blocked.",
      "Deterministic validation of volume, part count, triangle budget, and disconnected parts, with a bounded two-attempt repair loop.",
      "Numbered revisions with parent lineage; only validated revisions can be published.",
      "One workbench for the conversation, run timeline, plan approval, artifacts, and an embedded Chili3D editor, updated live over SSE.",
      "Ownership checks on every project mutation, build, event stream, and artifact download.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/CadPilot",
    image: cadpilotImg,
    thumb: cadpilotThumb,
  },
  {
    id: "continulearn",
    title: "ContinuLearn",
    year: "2025",
    category: "Robotics",
    summary: "Browser-based 3D continuum robot simulator.",
    description:
      "A browser 3D continuum robot simulator that embeds three Unity WebGL builds with Blender assets inside a Next.js app. It implements constant-curvature kinematics and a three-track roadmap unlocked by automated parameter checks, with KaTeX theory lessons and AI coaching over Gemini and ElevenLabs on a Turso and SQLite layer with Auth0 sessions.",
    stack: ["Next.js", "Unity WebGL", "C#", "TypeScript", "Gemini", "ElevenLabs", "Turso", "SQLite"],
    highlights: [
      "Embeds three Unity WebGL builds with Blender assets in a Next.js app.",
      "Constant-curvature kinematics with a three-track roadmap unlocked by automated parameter checks.",
      "KaTeX theory lessons alongside the simulator.",
      "AI coaching over Gemini and ElevenLabs on a Turso / SQLite layer with Auth0 sessions.",
    ],
    liveUrl: "https://continu-learn.vercel.app",
    sourceUrl: "https://github.com/MananKakkar1/ContinuLearn",
    image: continuLearnImg,
    thumb: continuLearnThumb,
  },
  {
    id: "sportsdeck",
    title: "SportsDeck",
    year: "2025",
    category: "Full-stack",
    summary: "Top project out of 200+ students: a sports community platform.",
    description:
      "A sports community platform built with Next.js, PostgreSQL with Prisma, and Redis. It has forums, polls, follow graphs, admin moderation, and Cloudinary uploads, plus a Hugging Face sentiment pipeline running on cron jobs. The API is documented in OpenAPI and Postman, and it ships with Docker Compose and Jest. Recognized by the course professor as the top project out of 200+ students.",
    stack: ["Next.js", "React", "PostgreSQL", "Prisma", "Redis", "Docker", "Jest"],
    highlights: [
      "Recognized by the course professor as the top project out of 200+ students.",
      "Forums, polls, follow graphs, and admin moderation with Cloudinary uploads.",
      "Hugging Face sentiment pipeline running on cron jobs.",
      "API documented in OpenAPI and Postman; ships with Docker Compose and Jest.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Sportsdeck",
    image: sportsdeckImg,
    thumb: sportsdeckThumb,
  },
  {
    id: "copycadder",
    title: "CopyCadder",
    year: "2025",
    category: "Robotics",
    summary: "Text-to-motion handwriting on a Franka Emika Panda arm.",
    description:
      "A text-to-motion pipeline that extracts letter outlines from fonts, converts them into 2D drawing strokes, and generates trajectories for a Franka Emika Panda robot. The 2D strokes are transformed into full SE(3) end-effector trajectories, including pen lifts between strokes, so the arm can draw multi-letter text continuously.",
    stack: ["Python", "Franka Emika Panda", "Ruckig", "SE(3) trajectories"],
    highlights: [
      "Extracts letter outlines from fonts and converts them into 2D drawing strokes.",
      "Transforms strokes into full SE(3) end-effector trajectories.",
      "Pen lifts between strokes for continuous multi-letter drawing.",
      "Time-optimal trajectory generation with Ruckig.",
    ],
    image: copycadderImg,
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
    image: shellImg,
  },
  {
    id: "eta",
    title: "ETA",
    year: "2025",
    category: "AI",
    summary: "Best Use of Auth0 and Top 4 at EmberHacks: an AI teaching assistant.",
    description:
      "An AI teaching assistant that won Best Use of Auth0 and finished Top 4 at EmberHacks 2025. It pairs Gemini 2.5 Flash and ElevenLabs voice with a Three.js avatar, and keeps persistent user context for multi-turn personalization.",
    stack: ["React", "Three.js", "Flask", "Gemini 2.5 Flash", "ElevenLabs", "Auth0"],
    highlights: [
      "Won Best Use of Auth0, Top 4 overall at EmberHacks 2025.",
      "Voice pipeline with Gemini 2.5 Flash and ElevenLabs.",
      "Three.js avatar for AI-driven visual responses.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/ETA",
    image: etaImg,
  },
  {
    id: "netly",
    title: "Netly",
    year: "2025",
    category: "AI",
    summary: "AI basketball review app that scores training sessions.",
    description:
      "An AI basketball review application built with React, Flask, and OpenCV at SpurHacks 2025. It analyzes training sessions across visibility, focus, activity, and stability metrics.",
    stack: ["React", "Flask", "OpenCV", "Python"],
    highlights: [
      "Scores sessions on visibility, focus, activity, and stability.",
      "Computer vision analysis with OpenCV.",
      "React and Flask app, built at SpurHacks 2025.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/Netly",
    image: netlyImg,
  },
  {
    id: "salesboard",
    title: "SalesBoard",
    year: "2024",
    category: "Full-stack",
    summary: "Real-time sales and inventory platform with Go APIs.",
    description:
      "A real-time sales and inventory platform with Go APIs, React, and SQLite. Server-Sent Events drive live dashboard updates with filtering and pagination; JWT auth protects full CRUD workflows across customers, products, and orders.",
    stack: ["Go", "React", "Redux Toolkit", "SQLite"],
    highlights: [
      "Server-Sent Events for live dashboard updates.",
      "JWT auth with middleware-protected write routes.",
      "Searchable lists, pagination, full CRUD, and real-time validation.",
    ],
    sourceUrl: "https://github.com/MananKakkar1/SalesBoard",
    image: salesImg,
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
];
