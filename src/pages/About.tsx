import "../components/css_files/About.css";
import tempImg from "../assets/photo.jpg";

const About = () => {
  return (
    <div className="about-creative-container">
      <div className="about-creative-card">
        <div className="about-creative-img-wrapper">
          <img src={tempImg} alt="Profile" className="about-creative-img" />
        </div>
        <h1 className="about-creative-title">About Me</h1>
        <div className="about-creative-description">
          <h2>Education</h2>
          <p>
            <span className="about-creative-highlight">
              I am currently pursuing an Honours Bachelor of Science as a
              Computer Science Specialist at the University of Toronto
              Mississauga.
            </span>
          </p>
          <h2>Tech Stack</h2>
          <p>
            <span className="about-creative-highlight">
              My technical expertise includes Python, Java, JavaScript,
              TypeScript, Bash, Assembly (Risc-V), HTML, CSS, C/C++, React,
              Flask, Node.js, Git, and VS Code.
            </span>
            <br />I am proficient back-end development and actively improving my front-end skills.
          </p>
          <h2>Goals</h2>
          <p>
            <span className="about-creative-highlight">
              My goal is to contribute to projects that solve real-world
              problems while delivering exceptional user experiences.
            </span>
            <br />I am eager to continue learning and growing as a developer,
            exploring emerging technologies like AI and cloud computing, and
            collaborating with teams to create scalable and efficient solutions.
          </p>
        </div>
        <div className="about-creative-socials">
          <a
            href="https://www.linkedin.com/in/manankakkar11/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-creative-social-btn"
            aria-label="LinkedIn"
          >
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
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
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
