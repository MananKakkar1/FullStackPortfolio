import { useState } from "react";
import "../components/css_files/About.css";
import "../components/css_files/Home.css";
import tempImg from "../assets/photo.jpg";

// Import tech stack images (same as Home)
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
  {
    name: "React",
    icon: <img src={reactImg} alt="React" />,
    link: "https://react.dev/",
  },
  {
    name: "TypeScript",
    icon: <img src={tsImg} alt="TypeScript" />,
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Node.js",
    icon: <img src={nodeImg} alt="Node.js" />,
    link: "https://nodejs.org/",
  },
  {
    name: "Express.js",
    icon: <img src={expressImg} alt="Express.js" />,
    link: "https://expressjs.com/",
  },
  {
    name: "MongoDB",
    icon: <img src={mongoImg} alt="MongoDB" />,
    link: "https://www.mongodb.com/",
  },
  {
    name: "Firebase",
    icon: <img src={firebaseImg} alt="Firebase" />,
    link: "https://firebase.google.com/",
  },
  {
    name: "Flask",
    icon: <img src={flaskImg} alt="Flask" />,
    link: "https://flask.palletsprojects.com/",
  },
  {
    name: "Python",
    icon: <img src={pythonImg} alt="Python" />,
    link: "https://www.python.org/",
  },
  {
    name: "Java",
    icon: <img src={javaImg} alt="Java" />,
    link: "https://www.java.com/",
  },
  {
    name: "JavaFX",
    icon: <img src={javafxImg} alt="JavaFX" />,
    link: "https://openjfx.io/",
  },
  {
    name: "C",
    icon: <img src={cImg} alt="C" />,
    link: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    name: "HTML5",
    icon: <img src={htmlImg} alt="HTML5" />,
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    icon: <img src={cssImg} alt="CSS3" />,
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Git",
    icon: <img src={gitImg} alt="GitHub" />,
    link: "https://git-scm.com/",
  },
  {
    name: "Bash",
    icon: <img src={bashImg} alt="Bash" />,
    link: "https://www.gnu.org/software/bash/",
  },
  {
    name: "Linux",
    icon: <img src={linuxImg} alt="Linux" />,
    link: "https://www.linux.org/",
  },
  {
    name: "Windows",
    icon: <img src={windowsImg} alt="Windows" />,
    link: "https://www.microsoft.com/en-us/windows",
  },
  {
    name: "Pygame",
    icon: <img src={pygameImg} alt="Pygame" />,
    link: "https://www.pygame.org/",
  },
  {
    name: "RISC-V",
    icon: <img src={riscvImg} alt="RISC-V" />,
    link: "https://riscv.org/",
  },
  {
    name: "Vercel",
    icon: <img src={vercelImg} alt="Vercel" />,
    link: "https://vercel.com/",
  },
];

const timeline = [
  {
    date: "2023 – Present",
    title: "Computer Science Undergraduate",
    org: "University of Toronto",
    description:
      "Specializing in Computer Science with a focus on software development, data structures, and algorithms.",
  },
  {
    date: "2019 – 2023",
    title: "High School Diploma",
    org: "Iroquois Ridge High School",
    description:
      "Graduated with a focus on computer science, engineering and mathematics, achieving high academic standards.",
  },
];

// --- Add missing state and handler for Gameboy tech stack cards ---
const INITIAL_TECHS = [0, 1, 2];

const About = () => {
  const [displayedTechs, setDisplayedTechs] = useState(INITIAL_TECHS);

  // Same logic as Home.tsx for D-pad navigation
  const handleTechDpad = (cardIdx: number, direction: "next" | "prev") => {
    setDisplayedTechs((prev) => {
      const updated = [...prev];
      if (direction === "next") {
        updated[cardIdx] = (prev[cardIdx] + 1) % techStack.length;
        // Prevent duplicate techs showing at the same time
        if (
          updated.filter((_, i) => i !== cardIdx).includes(updated[cardIdx])
        ) {
          updated[cardIdx] = (updated[cardIdx] + 1) % techStack.length;
        }
      } else {
        updated[cardIdx] =
          (prev[cardIdx] - 1 + techStack.length) % techStack.length;
        if (
          updated.filter((_, i) => i !== cardIdx).includes(updated[cardIdx])
        ) {
          updated[cardIdx] =
            (updated[cardIdx] - 1 + techStack.length) % techStack.length;
        }
      }
      return updated;
    });
  };

  return (
    <div className="about-creative-container">
      {/* Short Intro */}
      <div className="about-creative-header">
        <div className="about-creative-img-wrapper">
          <img src={tempImg} alt="Profile" className="about-creative-img" />
        </div>
        <div className="about-creative-intro">
          <h1 className="about-creative-title">About Me</h1>
          <p>
            Hi, I'm Manan Kakkar, a Computer Science student at the University
            of Toronto Mississauga. I'm passionate about building impactful
            software, exploring new technologies, and collaborating with others
            to solve real-world problems.
          </p>
          <div className="about-creative-socials">
            <a
              href="https://www.linkedin.com/in/manankakkar11/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-creative-social-btn"
              aria-label="LinkedIn"
            >
              <svg
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76 0-.97.78-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.78 1.76-1.75 1.76zm15.25 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-11h2.88v1.5h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v6.45z" />
              </svg>
            </a>
            <a
              href="https://github.com/manankakkar1"
              target="_blank"
              rel="noopener noreferrer"
              className="about-creative-social-btn"
              aria-label="GitHub"
            >
              <svg
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="about-creative-section">
        <h2>Experience & Education</h2>
        <div className="timeline-vertical">
          {timeline.map((item, idx) => (
            <div
              className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
              key={idx}
            >
              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-title">{item.title}</div>
                <div className="timeline-org">{item.org}</div>
                <div className="timeline-desc">{item.description}</div>
              </div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>

      {/* --- Tech Stack Section --- */}
      <div className="about-creative-section">
        <h2>Tech Stack</h2>
        <div className="home-projects-list">
          <div className="gameboy-cards-row">
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
                              <div
                                className="dpad-up"
                                onClick={() => handleTechDpad(idx, "next")}
                                title="Next Tech"
                              ></div>
                              <div
                                className="dpad-down"
                                onClick={() => handleTechDpad(idx, "prev")}
                                title="Previous Tech"
                              ></div>
                              <div
                                className="dpad-left"
                                onClick={() => handleTechDpad(idx, "prev")}
                                title="Previous Tech"
                              ></div>
                              <div
                                className="dpad-right"
                                onClick={() => handleTechDpad(idx, "next")}
                                title="Next Tech"
                              ></div>
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
        </div>
      </div>

      {/* Goals Section */}
      <div className="about-creative-section">
        <h2>Goals</h2>
        <p>
          My goal is to contribute to projects that solve real-world problems
          while delivering exceptional user experiences. I am eager to continue
          learning and growing as a developer, exploring emerging technologies
          like AI and cloud computing, and collaborating with teams to create
          scalable and efficient solutions.
        </p>
      </div>
    </div>
  );
};

export default About;
