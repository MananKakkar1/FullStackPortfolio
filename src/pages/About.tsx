import { useState } from "react";
import "../components/css_files/About.css";
import "../components/css_files/Home.css";
import tempImg from "../assets/photo.jpg";

import reactImg from "../assets/logo.png";
import tsImg from "../assets/typescript.png";
import nodeImg from "../assets/Node.js_logo.svg.png";
import expressImg from "../assets/ExpressJS-logo.png";
import mongoImg from "../assets/mongodb-logo-vector-2022.png";
import firebaseImg from "../assets/Firebase.png";
import flaskImg from "../assets/flask.png";
import pythonImg from "../assets/Python_logo_and_wordmark.svg.png";
import javaImg from "../assets/java-4-logo.svg";
import javafxImg from "../assets/javafx.png";
import cImg from "../assets/C_Programming_Language.svg.png";
import htmlImg from "../assets/HTML5_logo_and_wordmark.svg.png";
import cssImg from "../assets/css.png";
import bashImg from "../assets/Bash.png";
import linuxImg from "../assets/linux.png";
import windowsImg from "../assets/windows.png";
import pygameImg from "../assets/pygame_logo.png";
import riscvImg from "../assets/riscv.jpg";
import vercelImg from "../assets/vercel.png";
import gitImg from "../assets/GitHub-Logo.svg";

const techStack = [
  { name: "React", icon: <img src={reactImg} alt="React" />, link: "https://react.dev/" },
  { name: "TypeScript", icon: <img src={tsImg} alt="TypeScript" />, link: "https://www.typescriptlang.org/" },
  { name: "Node.js", icon: <img src={nodeImg} alt="Node.js" />, link: "https://nodejs.org/" },
  { name: "Express.js", icon: <img src={expressImg} alt="Express.js" />, link: "https://expressjs.com/" },
  { name: "MongoDB", icon: <img src={mongoImg} alt="MongoDB" />, link: "https://www.mongodb.com/" },
  { name: "Firebase", icon: <img src={firebaseImg} alt="Firebase" />, link: "https://firebase.google.com/" },
  { name: "Flask", icon: <img src={flaskImg} alt="Flask" />, link: "https://flask.palletsprojects.com/" },
  { name: "Python", icon: <img src={pythonImg} alt="Python" />, link: "https://www.python.org/" },
  { name: "Java", icon: <img src={javaImg} alt="Java" />, link: "https://www.java.com/" },
  { name: "JavaFX", icon: <img src={javafxImg} alt="JavaFX" />, link: "https://openjfx.io/" },
  { name: "C", icon: <img src={cImg} alt="C" />, link: "https://en.wikipedia.org/wiki/C_(programming_language)" },
  { name: "HTML5", icon: <img src={htmlImg} alt="HTML5" />, link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS3", icon: <img src={cssImg} alt="CSS3" />, link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Git", icon: <img src={gitImg} alt="GitHub" />, link: "https://git-scm.com/" },
  { name: "Bash", icon: <img src={bashImg} alt="Bash" />, link: "https://www.gnu.org/software/bash/" },
  { name: "Linux", icon: <img src={linuxImg} alt="Linux" />, link: "https://www.linux.org/" },
  { name: "Windows", icon: <img src={windowsImg} alt="Windows" />, link: "https://www.microsoft.com/en-us/windows" },
  { name: "Pygame", icon: <img src={pygameImg} alt="Pygame" />, link: "https://www.pygame.org/" },
  { name: "RISC-V", icon: <img src={riscvImg} alt="RISC-V" />, link: "https://riscv.org/" },
  { name: "Vercel", icon: <img src={vercelImg} alt="Vercel" />, link: "https://vercel.com/" },
];

const highlights = [
  {
    label: "Current Focus",
    value: "Full-Stack Engineering",
    detail:
      "Right now I am focused on React + TypeScript frontends and Node/Flask backends, with strong attention to API reliability and testing.",
  },
  {
    label: "Work Style",
    value: "Iterative and practical",
    detail:
      "I usually break features into small milestones, ship fast, and validate with tests and feedback before expanding scope.",
  },
  {
    label: "Strengths",
    value: "Backend + product mindset",
    detail:
      "I am strongest when I can own backend logic, data flow, and integration details while still keeping the UI clean and usable.",
  },
  {
    label: "Current Chapter",
    value: "UofT CS, internships, hackathons",
    detail:
      "I am a CS student at UofT, completed a software internship at Munafah.AI, and built practical projects at SpurHacks and EmberHacks.",
  },
];

const progressTimeline = [
  {
    period: "2019 - 2023",
    title: "High School Diploma",
    note: "Iroquois Ridge High School - focused on computer science, engineering, and mathematics with strong academic performance.",
  },
  {
    period: "2023 - Present",
    title: "Computer Science Undergraduate",
    note: "University of Toronto - specializing in Computer Science with a focus on software development and systems engineering.",
  },
  {
    period: "2023",
    title: "Hack the Ridge",
    note: "Collaborated in a 9-hour hackathon to build a retro-style ski resort planning app, strengthening teamwork and rapid prototyping.",
  },
  {
    period: "May 2025 - August 2025",
    title: "Software Engineer Intern - Munafah.AI",
    note: "Built secure backend systems and AI moderation tools for a B2B platform, reducing content review time from hours to around 2 minutes.",
  },
  {
    period: "June 2025",
    title: "SpurHacks Hackathon - Netly",
    note: "Built an AI-powered basketball analytics tool using YOLO, pose estimation, and OpenCV for real-time and video-based possession and rule-violation detection.",
  },
  {
    period: "October 2025",
    title: "EmberHacks Hackathon - ETA",
    note: "Earned first hackathon win with ETA, an AI-powered teaching assistant designed to help students understand complex course material.",
  },
  {
    period: "May 2026 - August 2027",
    title: "Software Engineer Intern - AMD",
    note: "Incoming full-stack software development engineering internship focused on production-scale internal tooling and systems.",
  },
];

const INITIAL_TECHS = [0, 1, 2];

const About = () => {
  const [displayedTechs, setDisplayedTechs] = useState(INITIAL_TECHS);

  const handleTechDpad = (cardIdx: number, direction: "next" | "prev") => {
    setDisplayedTechs((prev) => {
      const updated = [...prev];
      if (direction === "next") {
        updated[cardIdx] = (prev[cardIdx] + 1) % techStack.length;
        if (updated.filter((_, i) => i !== cardIdx).includes(updated[cardIdx])) {
          updated[cardIdx] = (updated[cardIdx] + 1) % techStack.length;
        }
      } else {
        updated[cardIdx] = (prev[cardIdx] - 1 + techStack.length) % techStack.length;
        if (updated.filter((_, i) => i !== cardIdx).includes(updated[cardIdx])) {
          updated[cardIdx] = (updated[cardIdx] - 1 + techStack.length) % techStack.length;
        }
      }
      return updated;
    });
  };

  return (
    <div className="about-shell">
      <section className="about-intro-split">
        <div className="about-intro-left">
          <p className="about-kicker">Profile</p>
          <h1>Software builder focused on impact, speed, and clean execution.</h1>
          <p className="about-lead">
            Hi! I am Manan Kakkar, a Computer Science student at the University
            of Toronto. I love building software that makes a real difference,
            diving into new technologies, and working with others to bring
            creative ideas to life. I am always excited to learn, grow, and
            take on challenges that push me to think outside the box.
          </p>
          <div className="about-socials">
            <a
              href="https://www.linkedin.com/in/manankakkar11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/manankakkar1"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="about-intro-right">
          <img src={tempImg} alt="Manan Kakkar" className="about-hero-image" />
          <div className="about-mini-tags">
            <span>Full Stack</span>
            <span>Systems</span>
            <span>AI</span>
          </div>
        </div>
      </section>

      <section className="about-highlights-grid">
        {highlights.map((fact) => (
          <article key={fact.label} className="about-fact-card">
            <p className="about-fact-label">{fact.label}</p>
            <p className="about-fact-value">{fact.value}</p>
            <p className="about-fact-detail">{fact.detail}</p>
          </article>
        ))}
      </section>

      <section className="about-progress-panel">
        <div className="about-section-head">
          <h2>Career Timeline</h2>
          <p>Milestones across education, internships, and hackathon wins.</p>
        </div>
        <div className="progress-rail">
          {progressTimeline.map((item) => (
            <article key={item.period + item.title} className="progress-node">
              <p className="progress-period">{item.period}</p>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-tech-panel">
        <div className="about-section-head">
          <h2>Interactive Tech Stack</h2>
          <p>Use each D-pad to rotate through technologies.</p>
        </div>
        <div className="home-projects-list">
          {displayedTechs.map((techIdx, idx) => {
            const tech = techStack[techIdx];
            return (
              <div key={idx} className="project-flip-container">
                <div className="project-flip-inner">
                  <div className="project-flip-front">
                    <div className="project-entry">
                      <div className="gameboy-lines">
                        <div className="gameboy-line"></div>
                        <div className="gameboy-line"></div>
                        <div className="gameboy-line"></div>
                      </div>
                      <div className="gameboy-screen">{tech.icon}</div>
                      <h3>{tech.name}</h3>
                      <div className="gameboy-controls">
                        <div className="tech-stack">
                          <a
                            href={tech.link}
                            className="tech-badge"
                            target="_blank"
                            rel="noopener noreferrer"
                            title={tech.name}
                          >
                            {tech.name}
                          </a>
                        </div>
                        <div className="gameboy-dpad">
                          <div className="dpad">
                            <div className="dpad-horizontal"></div>
                            <div className="dpad-vertical"></div>
                            <div className="dpad-center"></div>
                            <div className="dpad-up" onClick={() => handleTechDpad(idx, "next")} title="Next Tech"></div>
                            <div className="dpad-down" onClick={() => handleTechDpad(idx, "prev")} title="Previous Tech"></div>
                            <div className="dpad-left" onClick={() => handleTechDpad(idx, "prev")} title="Previous Tech"></div>
                            <div className="dpad-right" onClick={() => handleTechDpad(idx, "next")} title="Next Tech"></div>
                          </div>
                          <div className="action-buttons">
                            <a
                              href={tech.link}
                              className="action-button"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Tech Info"
                            >
                              INFO
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default About;
