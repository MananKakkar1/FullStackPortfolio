import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScrollTypewriter } from "../hooks/useScrollTypewriter";
import { projectsList } from "./Projects";
import "../components/css_files/Home.css";
import photoImg from "../assets/photo.jpg";

const HERO_TEXT = "Manan Kakkar";
const HERO_TYPING_SPEED = 80;
const HERO_PAUSE = 1200;
const TAGLINE = "Building software that ships.";

const FEATURED_IDS = ["custom-linux-shell", "netly", "continulearn"];
const FEATURED_PROJECTS = FEATURED_IDS.map((id) => projectsList.find((p) => p.id === id)!).filter(Boolean);

const TECH_NAMES = [
  "React", "TypeScript", "Node.js", "Python", "Go", "Java",
  "Flask", "Express.js", "MongoDB", "Firebase", "SQLite",
  "C", "RISC-V", "Bash", "Linux", "JavaFX", "Pygame",
  "OpenCV", "YOLOv8", "Redux Toolkit", "Vite", "Vercel", "Git",
];

const Home = () => {
  const location = useLocation();

  // Hero typewriter (fires on mount, not scroll)
  const [heroText, setHeroText] = useState("");
  const [taglineText, setTaglineText] = useState("");
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setHeroText(HERO_TEXT.slice(0, i));
      if (i < HERO_TEXT.length) setTimeout(tick, HERO_TYPING_SPEED);
      else setTimeout(() => setShowTagline(true), HERO_PAUSE);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showTagline) return;
    let j = 0;
    const tick = () => {
      j++;
      setTaglineText(TAGLINE.slice(0, j));
      if (j < TAGLINE.length) setTimeout(tick, 45);
    };
    tick();
  }, [showTagline]);

  // Scroll-reveal for sections
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRef = (i: number) => (el: HTMLElement | null) => {
    sectionRefs.current[i] = el;
  };

  // Selected Work typewriter
  const { ref: workHeadRef, displayed: workHeadText } =
    useScrollTypewriter("Featured Projects.", 50);

  // Tech heading typewriter
  const { ref: techHeadRef, displayed: techHeadText } =
    useScrollTypewriter("Tech Stack.", 50);

  // Contact heading typewriter
  const { ref: contactHeadRef, displayed: contactHeadText } =
    useScrollTypewriter("Get In Touch.", 50);

  // Contact form
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (location.hash === "#contact-sec") {
      document.getElementById("contact-sec")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        setStatus("Message sent.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send.");
      }
    } catch {
      setStatus("Failed to send.");
    }
  };

  return (
    <div className="home-root">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-photo-col">
            <div className="hero-hex-frame">
              <img src={photoImg} alt="Manan Kakkar" />
            </div>
          </div>
          <div className="hero-text-col">
            <p className="hero-kicker">Software Engineer Intern · AMD · UofT CS</p>
            <h1 className="hero-name">
              {heroText}
              <span className="cursor" />
            </h1>
            <p className="hero-tagline">
              {taglineText}
              {showTagline && taglineText.length < TAGLINE.length && (
                <span className="cursor" />
              )}
            </p>
            <p className="hero-bio">
              CS student at the University of Toronto and Software Engineer Intern at AMD —
              building practical, impactful software across the full stack.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="hero-btn-primary">View My Work</Link>
              <a href="#contact-sec" className="hero-btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact-sec")?.scrollIntoView({ behavior: "smooth" });
                }}>
                Contact
              </a>
            </div>
          </div>
        </div>
        <div className="hero-scroll-cue">
          <span style={{ animation: "bounce 1.8s ease infinite" }}>↓</span>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section className="home-section work-section">
        <h2
          className="section-heading"
          ref={workHeadRef as React.RefObject<HTMLHeadingElement>}
        >
          {workHeadText}
          <span className="cursor" style={{ opacity: workHeadText.length > 0 ? 1 : 0 }} />
        </h2>
        <div className="work-list">
          {FEATURED_PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="work-row reveal"
              ref={addRef(i)}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="work-num">0{i + 1}</span>
              <div className="work-content">
                <div className="work-title-row">
                  <h3 className="work-title">{p.title}</h3>
                  <span className="work-category">{p.category}</span>
                </div>
                <p className="work-desc">{p.description}</p>
                <div className="work-links">
                  <Link to={`/projects/${p.id}`} className="work-link">View Details →</Link>
                  {p.sourceUrl && (
                    <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="work-link">
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="work-footer reveal" ref={addRef(FEATURED_PROJECTS.length)}>
          <Link to="/projects" className="view-all-link">
            View all {projectsList.length} projects →
          </Link>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="home-section tech-section">
        <h2
          className="section-heading"
          ref={techHeadRef as React.RefObject<HTMLHeadingElement>}
        >
          {techHeadText}
          <span className="cursor" style={{ opacity: techHeadText.length > 0 ? 1 : 0 }} />
        </h2>
        <div className="tech-flow reveal" ref={addRef(FEATURED_PROJECTS.length + 1)}>
          {TECH_NAMES.map((t, i) => (
            <React.Fragment key={t}>
              <span className="tech-name">{t}</span>
              {i < TECH_NAMES.length - 1 && <span className="tech-dot">·</span>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="home-section contact-section" id="contact-sec">
        <h2
          className="section-heading"
          ref={contactHeadRef as React.RefObject<HTMLHeadingElement>}
        >
          {contactHeadText}
          <span className="cursor" style={{ opacity: contactHeadText.length > 0 ? 1 : 0 }} />
        </h2>
        <p className="contact-sub reveal" ref={addRef(FEATURED_PROJECTS.length + 2)}>
          Open to internships, collaborations, and interesting problems.
        </p>
        <form
          className="contact-form reveal"
          ref={addRef(FEATURED_PROJECTS.length + 3)}
          onSubmit={handleSubmit}
        >
          <div className="form-row">
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-field">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              required
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Your message..."
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-submit">Send Message</button>
          {status && <p className="contact-status">{status}</p>}
        </form>
      </section>
    </div>
  );
};

export default Home;
