import { useState } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import ParticleBackground from "./components/ParticleBackground";
import HyperspaceIntro from "./components/HyperspaceIntro";
import { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

const App = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ParticlesProvider init={initParticles}>
      {!introDone && <HyperspaceIntro onDone={() => setIntroDone(true)} />}
      <ParticleBackground />
      <Router>
        <Navbar />
        <div className="app-shell">
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </ParticlesProvider>
  );
};

export default App;
