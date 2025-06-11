"use client";

import type React from "react";

import "../components/css_files/Home.css";
import { projectsList } from "./Projects";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import photoImg from "../assets/photo.jpg";

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
    }, 15000);

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
            <span className="badge badge-experience">2+ Years Experience</span>
          </div>
        </div>
        <div className="hero-right">
          <h1>
            <span className="highlight">{typed}</span>
            <span className="typing-cursor">|</span>
          </h1>
          <p>
            A passionate developer dedicated to crafting professional,
            functional, and modern web applications that make a difference.
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
                    <div className="gameboy-screen">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                      />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

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
                            href={`https://github.com/MananKakkar1/${project.id}`}
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
                      <p className="project-description">
                        {nextDisplayed[idx].description}
                      </p>

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
