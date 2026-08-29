import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "../lib/scroll";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Work from "../sections/Work";
import Contact from "../sections/Contact";

export default function Home() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const id = state?.scrollTo ?? location.hash.replace("#", "");
    if (!id) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -64 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [location, lenis]);

  // Pinned triggers need a refresh once fonts + lazy media have settled.
  useEffect(() => {
    const done = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(done);
    const t = window.setTimeout(done, 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Work />
      <Contact />
    </>
  );
}
