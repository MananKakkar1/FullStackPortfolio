import "../components/css_files/Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-left">
        <div className="profile-img-wrapper">
          <img src="./images/temp.jpg" alt="Profile" className="profile-img" />
          <span className="badge badge-experience">
            2+ Years Experience
          </span>
        </div>
      </div>
      <div className="hero-right">
        <h1>
          <span className="highlight">Hi, I'm Manan</span>
        </h1>
        <p>
          A passionate developer dedicated to crafting professional, functional,
          and modern web applications that make a difference.
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
  );
};

export default Home;
