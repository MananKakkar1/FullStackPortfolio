import "./css_files/Navbar.css";

const Navbar = () => {
  return (
    <div>
      <header className="header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <nav className="navbar">
            <a href="./">Home</a>
            <a href="/projects">Projects</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
