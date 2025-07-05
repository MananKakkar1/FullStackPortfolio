"use client";

import React from "react";
import "../components/css_files/Home.css";
import { projectsList } from "./Projects";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import photoImg from "../assets/photo.jpg";

// Import images from assets
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
import tempImg from "../assets/temp.jpg";

const FLIP_DURATION = 600;
const TYPING_TEXT = "Hi, I'm Manan";
const TYPING_SPEED = 100; // ms per character
const DELETING_SPEED = 50; // ms per character
const PAUSE_BEFORE_DELETE = 1500; // ms
const PAUSE_BEFORE_TYPE = 800; // ms

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies?: string;
  sourceUrl?: string;
}

function getRandomProjects(
  projectsList: Project[],
  count: number,
  exclude: { id: string | number }[] = []
) {
  const available = projectsList.filter(
    (p) => !exclude.some((e) => e.id === p.id)
  );
  const selected: typeof projectsList = [];
  while (selected.length < Math.min(count, available.length)) {
    const idx = Math.floor(Math.random() * available.length);
    selected.push(available.splice(idx, 1)[0]);
  }
  if (selected.length < count) {
    const rest = projectsList.filter(
      (p: { id: string | number }) =>
        !selected.some((s: { id: string | number }) => s.id === p.id)
    );
    while (selected.length < count && rest.length) {
      const idx = Math.floor(Math.random() * rest.length);
      selected.push(rest.splice(idx, 1)[0]);
    }
  }
  return selected;
}

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

const techStack = [
  {
    name: "React",
    icon: (
      <span className="tech-img-wrapper">
        <img src={reactImg} alt="React" />
      </span>
    ),
    link: "https://react.dev/",
  },
  {
    name: "TypeScript",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tsImg} alt="TypeScript" />
      </span>
    ),
    link: "https://www.typescriptlang.org/",
  },
  {
    name: "Node.js",
    icon: (
      <span className="tech-img-wrapper">
        <img src={nodeImg} alt="Node.js" />
      </span>
    ),
    link: "https://nodejs.org/",
  },
  {
    name: "Express.js",
    icon: (
      <span className="tech-img-wrapper">
        <img src={expressImg} alt="Express.js" />
      </span>
    ),
    link: "https://expressjs.com/",
  },
  {
    name: "MongoDB",
    icon: (
      <span className="tech-img-wrapper">
        <img src={mongoImg} alt="MongoDB" />
      </span>
    ),
    link: "https://www.mongodb.com/",
  },
  {
    name: "Firebase",
    icon: (
      <span className="tech-img-wrapper">
        <img src={firebaseImg} alt="Firebase" />
      </span>
    ),
    link: "https://firebase.google.com/",
  },
  {
    name: "Flask",
    icon: (
      <span className="tech-img-wrapper">
        <img src={flaskImg} alt="Flask" />
      </span>
    ),
    link: "https://flask.palletsprojects.com/",
  },
  {
    name: "Python",
    icon: (
      <span className="tech-img-wrapper">
        <img src={pythonImg} alt="Python" />
      </span>
    ),
    link: "https://www.python.org/",
  },
  {
    name: "Java",
    icon: (
      <span className="tech-img-wrapper">
        <img src={javaImg} alt="Java" />
      </span>
    ),
    link: "https://www.java.com/",
  },
  {
    name: "JavaFX",
    icon: (
      <span className="tech-img-wrapper">
        <img src={javafxImg} alt="JavaFX" />
      </span>
    ),
    link: "https://openjfx.io/",
  },
  {
    name: "C",
    icon: (
      <span className="tech-img-wrapper">
        <img src={cImg} alt="C" />
      </span>
    ),
    link: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    name: "HTML5",
    icon: (
      <span className="tech-img-wrapper">
        <img src={htmlImg} alt="HTML5" />
      </span>
    ),
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS3",
    icon: (
      <span className="tech-img-wrapper">
        <img src={cssImg} alt="CSS3" />
      </span>
    ),
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Git",
    icon: (
      <span className="tech-img-wrapper">
        <img src={gitImg} alt="GitHub" />
      </span>
    ),
    link: "https://git-scm.com/",
  },
  {
    name: "Bash",
    icon: (
      <span className="tech-img-wrapper">
        <img src={bashImg} alt="Bash" />
      </span>
    ),
    link: "https://www.gnu.org/software/bash/",
  },
  {
    name: "Linux",
    icon: (
      <span className="tech-img-wrapper">
        <img src={linuxImg} alt="Linux" />
      </span>
    ),
    link: "https://www.linux.org/",
  },
  {
    name: "Windows",
    icon: (
      <span className="tech-img-wrapper">
        <img src={windowsImg} alt="Windows" />
      </span>
    ),
    link: "https://www.microsoft.com/en-us/windows",
  },
  {
    name: "Pygame",
    icon: (
      <span className="tech-img-wrapper">
        <img src={pygameImg} alt="Pygame" />
      </span>
    ),
    link: "https://www.pygame.org/",
  },
  {
    name: "RISC-V",
    icon: (
      <span className="tech-img-wrapper">
        <img src={riscvImg} alt="RISC-V" />
      </span>
    ),
    link: "https://riscv.org/",
  },
  {
    name: "Vercel",
    icon: (
      <span className="tech-img-wrapper">
        <img src={vercelImg} alt="Vercel" />
      </span>
    ),
    link: "https://vercel.com/",
  },
  {
    name: "Redux Toolkit",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="Redux Toolkit" />
      </span>
    ),
    link: "https://redux-toolkit.js.org/",
  },
  {
    name: "Emotion",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="Emotion" />
      </span>
    ),
    link: "https://emotion.sh/",
  },
  {
    name: "Tailwind CSS",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="Tailwind CSS" />
      </span>
    ),
    link: "https://tailwindcss.com/",
  },
  {
    name: "Go",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="Go" />
      </span>
    ),
    link: "https://go.dev/",
  },
  {
    name: "SQLite",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="SQLite" />
      </span>
    ),
    link: "https://www.sqlite.org/index.html",
  },
  {
    name: "SQL",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="SQL" />
      </span>
    ),
    link: "https://www.mysql.com/",
  },
  {
    name: "JWT",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="JWT" />
      </span>
    ),
    link: "https://jwt.io/",
  },
  {
    name: "YOLOV8",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="YOLOV8" />
      </span>
    ),
    link: "https://github.com/ultralytics/ultralytics",
  },
  {
    name: "OpenCV",
    icon: (
      <span className="tech-img-wrapper">
        <img src={tempImg} alt="OpenCV" />
      </span>
    ),
    link: "https://opencv.org/",
  },
  // ...add more as needed
];

const Home = () => {
  const location = useLocation();

  const [displayed, setDisplayed] = useState(() =>
    getRandomProjects(projectsList, 3)
  );
  const [nextDisplayed, setNextDisplayed] = useState(displayed);
  const [flipping, setFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [displayedTechs, setDisplayedTechs] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getRandomProjects(projectsList, 3, displayed);
      setNextDisplayed(next);
      setFlipping(true);
      setTimeout(() => {
        setDisplayed(next);
        setFlipping(false);
        setFlipCount((c) => c + 1);
      }, FLIP_DURATION);
    }, 10000);

    return () => clearInterval(interval);
  }, [projectsList, displayed]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (location.hash === "#contact-sec") {
      const contactSection = document.getElementById("contact-sec");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!isDeleting && typed.length < TYPING_TEXT.length) {
      timeout = setTimeout(
        () => setTyped(TYPING_TEXT.slice(0, typed.length + 1)),
        TYPING_SPEED
      );
    } else if (!isDeleting && typed.length === TYPING_TEXT.length) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE);
    } else if (isDeleting && typed.length > 0) {
      timeout = setTimeout(
        () => setTyped(TYPING_TEXT.slice(0, typed.length - 1)),
        DELETING_SPEED
      );
    } else if (isDeleting && typed.length === 0) {
      timeout = setTimeout(() => setIsDeleting(false), PAUSE_BEFORE_TYPE);
    }
    return () => clearTimeout(timeout);
  }, [typed, isDeleting]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/index", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: `Subject: ${form.subject}\n\n${form.message}`,
        }),
      });
      if (res.ok) {
        setStatus("Message sent!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Failed to send message.");
    }
  };

  // D-pad for tech cards: next/prev, no duplicates
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
    <div className="home-page-root">
      <div className="hero-section">
        <div className="hero-left">
          <div className="profile-img-wrapper">
            <img
              src={photoImg || "/placeholder.svg"}
              alt="Profile"
              className="profile-img"
            />
          </div>
        </div>
        <div className="hero-right">
          <h1>
            <span className="highlight" style={{ display: "inline" }}>
              {typed}
            </span>
            <span className="typing-cursor">|</span>
          </h1>
          <p>
            A passionate developer dedicated to crafting professional,
            functional, and modern applications that make a difference.
          </p>
          <a href="/projects" className="cta-btn">
            View My Work
          </a>
        </div>
      </div>
      <div className="featured-projects">
        <h1>Featured Projects</h1>
        <div className="home-projects-list">
          {displayed.map((project, idx) => (
            <div
              key={`${flipCount}-${idx}`}
              className={`project-flip-container${flipping ? " flipping" : ""}${
                idx === 1 ? " lean-right" : ""
              }`}
            >
              <div className="project-flip-inner">
                <div className="project-flip-front">
                  <div className="project-entry">
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
                        {project.technologies &&
                          parseTechnologies(project.technologies).map(
                            (tech, index) => (
                              <button
                                key={index}
                                className="tech-badge"
                                title={tech}
                              >
                                {tech}
                              </button>
                            )
                          )}
                      </div>

                      <div className="gameboy-dpad">
                        <div className="dpad">
                          <div className="dpad-horizontal"></div>
                          <div className="dpad-vertical"></div>
                          <div
                            className="dpad-center"
                            onClick={() => console.log("Center pressed")}
                          ></div>

                          {/* Clickable directional buttons */}
                          <div
                            className="dpad-up"
                            onClick={() => console.log("Up pressed")}
                            title="Navigate Up"
                          ></div>
                          <div
                            className="dpad-down"
                            onClick={() => console.log("Down pressed")}
                            title="Navigate Down"
                          ></div>
                          <div
                            className="dpad-left"
                            onClick={() => console.log("Left pressed")}
                            title="Navigate Left"
                          ></div>
                          <div
                            className="dpad-right"
                            onClick={() => console.log("Right pressed")}
                            title="Navigate Right"
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
                            href={project.sourceUrl || ``}
                            className="action-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View Source Code"
                          >
                            <GitHubIcon />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project-flip-back">
                  {nextDisplayed[idx] && (
                    <div className="project-entry">
                      <div className="gameboy-screen">
                        <img
                          src={nextDisplayed[idx].image || "/placeholder.svg"}
                          alt={nextDisplayed[idx].title}
                        />
                      </div>
                      <h3>{nextDisplayed[idx].title}</h3>

                      <div className="gameboy-controls">
                        <div className="tech-stack">
                          {nextDisplayed[idx].technologies &&
                            parseTechnologies(
                              nextDisplayed[idx].technologies
                            ).map((tech, index) => (
                              <button
                                key={index}
                                className="tech-badge"
                                title={tech}
                              >
                                {tech}
                              </button>
                            ))}
                        </div>

                        <div className="gameboy-dpad">
                          <div className="dpad">
                            <div className="dpad-horizontal"></div>
                            <div className="dpad-vertical"></div>
                            <div className="dpad-center"></div>
                          </div>

                          <div className="action-buttons">
                            <a
                              href={`/projects/${nextDisplayed[idx].id}`}
                              className="action-button"
                              title="View Project Details"
                            >
                              INFO
                            </a>
                            <a
                              href={`https://github.com/MananKakkar1/${nextDisplayed[idx].id}`}
                              className="action-button"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View Source Code"
                            >
                              <GitHubIcon />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tech-stack-grid-wrapper">
        <div className="tech-stack-label">
          <h1>Tech Stack</h1>
          <h3>(Use the D-pad to see more!)</h3>
        </div>

        {/* --- 3 Gameboy-style tech cards --- */}
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
        {/* --- End Gameboy-style tech cards --- */}
      </div>
      <div className="contact-section" id="contact-sec">
        <h1>Contact Me</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={form.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={form.message}
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
        {status && (
          <div style={{ marginTop: "16px", color: "#00fff7" }}>{status}</div>
        )}
      </div>
    </div>
  );
};

export default Home;
