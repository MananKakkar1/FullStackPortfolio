import "../components/css_files/Home.css";
import { projectsList } from "./Projects";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const bestProjects = projectsList.slice(0, 3);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact-sec") {
      const contactSection = document.getElementById("contact-sec");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" required />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
