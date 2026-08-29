import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useLenis } from "lenis/react";
import { IconContext } from "./lib/icons";
import { ScrollTrigger } from "./lib/scroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

/** Keep pinned triggers and scroll position sane across client-side navigation. */
function RouteEffects() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return null;
}

export default function App() {
  return (
    <IconContext.Provider value={{ weight: "bold", size: 18, mirrored: false }}>
      <BrowserRouter>
        <RouteEffects />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:id" element={<ProjectDetail />} />
            <Route path="*" element={<ProjectDetail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </IconContext.Provider>
  );
}
