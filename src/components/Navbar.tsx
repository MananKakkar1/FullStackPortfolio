import "./css_files/Navbar.css";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/Home#contact-sec");
    } else {
      const contactSection = document.getElementById("contact-sec");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState(null, "", "#contact-sec");
    }
  };

  return (
    <div>
      <header className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <nav className="navbar">
          <Link to="/Home">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About Me</Link>
          <a href="/#contact-sec" onClick={handleContactClick}>Contact Me</a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;