import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css_files/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== "/Home") {
      navigate("/Home#contact-sec");
    } else {
      document.getElementById("contact-sec")?.scrollIntoView({ behavior: "smooth" });
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

  const handleNavScrollTop = () => window.scrollTo({ top: 0, behavior: "auto" });

  return (
    <header className={`navbar-root${scrolled ? " scrolled" : ""}`}>
      <Link to="/Home" onClick={handleHomeClick} className="navbar-brand">
        <span className="navbar-monogram">MK</span>
        <span className="navbar-name">Manan Kakkar</span>
      </Link>

      <nav className="navbar-links">
        <Link to="/Home" onClick={handleHomeClick}>Home</Link>
        <Link to="/projects" onClick={handleNavScrollTop}>Projects</Link>
        <Link to="/about" onClick={handleNavScrollTop}>About</Link>
      </nav>

      <a href="#contact-sec" onClick={handleContactClick} className="navbar-cta">
        Contact
      </a>
    </header>
  );
};

export default Navbar;
