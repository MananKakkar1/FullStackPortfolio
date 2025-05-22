import "../components/css_files/Home.css";
import { projectsList } from "./Projects";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import tempImg from "../assets/temp.jpg"; // <-- Add this import

const FLIP_DURATION = 600;

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
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

const Home = () => {
  const location = useLocation();

  const [displayed, setDisplayed] = useState(() =>
    getRandomProjects(projectsList, 3)
  );
  const [nextDisplayed, setNextDisplayed] = useState(displayed);
  const [flipping, setFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
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
              src={tempImg} // <-- Use imported image here
              alt="Profile"
              className="profile-img"
            />
            <span className="badge badge-experience">2+ Years Experience</span>
          </div>
        </div>
        <div className="hero-right">
          <h1>
            <span className="highlight">Hi, I'm Manan</span>
          </h1>
          <p>
            A passionate developer dedicated to crafting professional,
            functional, and modern web applications that make a difference.
          </p>
          <a href="/projects" className="cta-btn">
            View My Work
          </a>
          <div className="stats">
            <div>
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div>
              <span className="stat-number">5+</span>
              <span className="stat-label">Certifications</span>
            </div>
          </div>
        </div>
      </div>
      <div className="featured-projects">
        <h1>Featured Projects</h1>
        <div className="home-projects-list">
          {displayed.map((project, idx) => (
            <div
              key={`${flipCount}-${idx}`}
              className={`project-flip-container${flipping ? " flipping" : ""}`}
            >
              <div className="project-flip-inner">
                <div className="project-flip-front">
                  <a
                    className="project-entry"
                    href={`/projects/${project.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img src={project.image} alt={project.title} />
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </a>
                </div>
                <div className="project-flip-back">
                  {nextDisplayed[idx] && (
                    <a
                      className="project-entry"
                      href={`/projects/${nextDisplayed[idx].id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={nextDisplayed[idx].image}
                        alt={nextDisplayed[idx].title}
                      />
                      <h3>{nextDisplayed[idx].title}</h3>
                      <p className="project-description">
                        {nextDisplayed[idx].description}
                      </p>
                    </a>
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
