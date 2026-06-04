import React, { useEffect, useRef } from "react";
import "../components/css_files/About.css";
import { useScrollTypewriter } from "../hooks/useScrollTypewriter";
import photoImg from "../assets/photo.jpg";

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
  { name: "React", icon: reactImg },
  { name: "TypeScript", icon: tsImg },
  { name: "Node.js", icon: nodeImg },
  { name: "Express.js", icon: expressImg },
  { name: "MongoDB", icon: mongoImg },
  { name: "Firebase", icon: firebaseImg },
  { name: "Flask", icon: flaskImg },
  { name: "Python", icon: pythonImg },
  { name: "Java", icon: javaImg },
  { name: "JavaFX", icon: javafxImg },
  { name: "C", icon: cImg },
  { name: "HTML5", icon: htmlImg },
  { name: "CSS3", icon: cssImg },
  { name: "Git", icon: gitImg },
  { name: "Bash", icon: bashImg },
  { name: "Linux", icon: linuxImg },
  { name: "Windows", icon: windowsImg },
  { name: "Pygame", icon: pygameImg },
  { name: "RISC-V", icon: riscvImg },
  { name: "Vercel", icon: vercelImg },
];

const highlights = [
  { label: "Current Role", value: "Software Engineer Intern · AMD" },
  { label: "Work Style", value: "Iterative and practical" },
  { label: "Strengths", value: "Backend + product mindset" },
  { label: "Current Chapter", value: "UofT CS + AMD internship" },
];

const progressTimeline = [
  {
    period: "2019 – 2023",
    title: "High School Diploma",
    note: "Iroquois Ridge High School — computer science, engineering, and mathematics.",
  },
  {
    period: "2023 – Present",
    title: "Computer Science Undergraduate",
    note: "University of Toronto — specializing in software development and systems engineering.",
  },
  {
    period: "2023",
    title: "Hack the Ridge",
    note: "Built a retro-style ski resort planning app in a 9-hour hackathon, strengthening teamwork and rapid prototyping.",
  },
  {
    period: "May – Aug 2025",
    title: "Software Engineer Intern · Munafah.AI",
    note: "Built secure backend systems and AI moderation tools, reducing content review time from hours to ~2 minutes.",
  },
  {
    period: "June 2025",
    title: "SpurHacks · Netly",
    note: "AI-powered basketball analytics using YOLO and OpenCV for real-time possession and violation detection.",
  },
  {
    period: "October 2025",
    title: "EmberHacks · ETA — 1st Place",
    note: "Won Best Use of Auth0 with ETA, an AI teaching assistant using Gemini and ElevenLabs.",
  },
  {
    period: "May 2026 – Aug 2027",
    title: "Software Engineer Intern · AMD",
    note: "Building production-scale internal tooling and systems across the full stack.",
  },
];

const About = () => {
  // Section headings typewriter
  const { ref: introRef, displayed: introText } = useScrollTypewriter("Manan Kakkar.", 55);
  const { ref: timelineRef, displayed: timelineText } = useScrollTypewriter("Career Timeline.", 50);
  const { ref: techRef, displayed: techText } = useScrollTypewriter("Tech Stack.", 50);

  // Reveal refs
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const timelineNodeRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i || 0);
            setTimeout(() => e.target.classList.add("node-visible"), i * 120);
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineNodeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addReveal = (i: number) => (el: HTMLElement | null) => { revealRefs.current[i] = el; };
  const addNode = (i: number) => (el: HTMLElement | null) => { timelineNodeRefs.current[i] = el; };

  return (
    <div className="about-root">

      {/* ── INTRO SPLIT ── */}
      <section className="about-intro">
        <div className="about-intro-left">
          <p className="about-kicker">Profile</p>
          <h1
            className="about-main-heading"
            ref={introRef as React.RefObject<HTMLHeadingElement>}
          >
            {introText}
            <span className="cursor" style={{ opacity: introText.length > 0 && introText.length < "Manan Kakkar.".length ? 1 : 0 }} />
          </h1>
          <p className="about-bio reveal" ref={addReveal(0)}>
            Computer Science student at the University of Toronto. I build software
            that makes a real difference — clean backends, fast frontends, and AI-powered
            tools that ship.
          </p>
          <p className="about-bio reveal" ref={addReveal(1)}>
            Competed at SpurHacks and EmberHacks (1st place), interned at Munafah.AI,
            and currently a Software Engineer Intern at AMD.
          </p>
          <div className="about-socials reveal" ref={addReveal(2)}>
            <a href="https://www.linkedin.com/in/manankakkar11/" target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href="https://github.com/manankakkar1" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="about-intro-right reveal" ref={addReveal(3)}>
          <img src={photoImg} alt="Manan Kakkar" className="about-photo" />
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="about-highlights">
        {highlights.map((h, i) => (
          <div className="highlight-row reveal" key={h.label} ref={addReveal(4 + i)}>
            <span className="highlight-label">{h.label}</span>
            <span className="highlight-dash">———</span>
            <span className="highlight-value">{h.value}</span>
          </div>
        ))}
      </section>

      {/* ── TIMELINE ── */}
      <section className="about-timeline-section">
        <h2
          className="about-section-heading"
          ref={timelineRef as React.RefObject<HTMLHeadingElement>}
        >
          {timelineText}
          <span className="cursor" style={{ opacity: timelineText.length > 0 && timelineText.length < "Career Timeline.".length ? 1 : 0 }} />
        </h2>
        <div className="timeline-rail">
          {progressTimeline.map((item, i) => (
            <div
              className="timeline-node"
              key={item.period + item.title}
              ref={addNode(i)}
              data-i={i}
            >
              <div className="timeline-left">
                <span className="timeline-period">{item.period}</span>
              </div>
              <div className="timeline-dot-col">
                <div className="timeline-dot" />
                {i < progressTimeline.length - 1 && <div className="timeline-connector" />}
              </div>
              <div className="timeline-right">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-note">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="about-tech-section">
        <h2
          className="about-section-heading"
          ref={techRef as React.RefObject<HTMLHeadingElement>}
        >
          {techText}
          <span className="cursor" style={{ opacity: techText.length > 0 && techText.length < "Tech Stack.".length ? 1 : 0 }} />
        </h2>
        <div className="tech-grid reveal" ref={addReveal(9)}>
          {techStack.map((tech) => (
            <div className="tech-cell" key={tech.name}>
              <img src={tech.icon} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
