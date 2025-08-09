import "./css_files/Navbar.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import logo1 from "../assets/logo2.svg";

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

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/Home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/Home");
    }
  };

  const handleNavScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <div>
      <header className="header">
        <img src={logo1} alt="Logo" className="logo" />
        <nav className="navbar">
          <Link to="/Home" onClick={handleHomeClick}>
            Home
          </Link>
          <Link to="/projects" onClick={handleNavScrollTop}>
            Projects
          </Link>
          <Link to="/about" onClick={handleNavScrollTop}>
            About Me
          </Link>
          <a href="/#contact-sec" onClick={handleContactClick}>
            Contact Me
          </a>
          <Link to="/resume" onClick={handleNavScrollTop}>
            Resume
          </Link>
        </nav>
        <ThemeSelector />
      </header>
    </div>
  );
};

export default Navbar;
