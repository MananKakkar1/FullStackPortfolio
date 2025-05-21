import "../components/css_files/Home.css";
import { projectsList } from "./Projects";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const bestProjects = projectsList.slice(0, 3);
  const location = useLocation();

  // State for form fields
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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
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
              src="./images/temp.jpg"
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
          {bestProjects.map((project) => (
            <a
              key={project.id}
              className="project-entry"
              href={`/projects/${project.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </a>
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
        {status && <div style={{ marginTop: "16px", color: "#00fff7" }}>{status}</div>}
      </div>
    </div>
  );
};

export default Home;
