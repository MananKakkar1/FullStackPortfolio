import "../components/css_files/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <div className="about-image-placeholder">
        <img src="./images/temp.jpg" alt="Profile" className="profile-img" />
      </div>
      <div className="about-content">
        <p className="about-intro">
          I am a passionate developer dedicated to crafting professional,
          functional, and modern web applications that make a difference.
        </p>
        <p className="about-description">
          With a strong foundation in computer science and web development, I
          have built applications like an AI-powered Chess Game and an
          AI-enhanced Paint App using technologies such as JavaScript, Java,
          Python, and React. I thrive on challenges and enjoy turning complex
          problems into elegant, user-friendly solutions.
        </p>
        <p className="about-goals">
          My goal is to develop applications that not only meet user needs but
          also deliver exceptional user experiences. I continuously learn and
          stay updated with the latest trends in technology—from using GPT-based
          engines for intelligent interactions to implementing recursive
          visualizations and state machines for structured design. I’m currently
          seeking software engineering internships where I can contribute to
          impactful projects, grow alongside experienced developers, and further
          sharpen my skills in full-stack development and system design.
        </p>
      </div>
    </div>
  );
};

export default About;
