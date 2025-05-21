import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
