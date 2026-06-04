import { useEffect, useRef, useState } from "react";
import "./css_files/HyperspaceIntro.css";

interface Props {
  onDone: () => void;
}

const HyperspaceIntro = ({ onDone }: Props) => {
  const [phase, setPhase] = useState<"in" | "loading" | "out">("in");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const LOAD_DURATION = 1800;

  useEffect(() => {
    // Phase 1: lines draw in (600ms), then start loading bar
    const startLoad = setTimeout(() => {
      setPhase("loading");
      startRef.current = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startRef.current;
        const p = Math.min(elapsed / LOAD_DURATION, 1);
        // ease out cubic for natural deceleration near 100%
        setProgress(1 - Math.pow(1 - p, 3));
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // Hold at 100%, then fade out
          setTimeout(() => setPhase("out"), 300);
          setTimeout(onDone, 300 + 600);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 600);

    return () => {
      clearTimeout(startLoad);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  const pct = Math.round(progress * 100);

  return (
    <div className={`intro-root intro-${phase}`}>
      <div className="intro-mark">
        <span className="intro-line intro-line-1" />
        <span className="intro-line intro-line-2" />
        <span className="intro-line intro-line-3" />
      </div>

      <div className={`intro-load-block intro-load-${phase}`}>
        <div className="intro-label">INITIALIZING</div>
        <div className="intro-bar-track">
          <div
            className="intro-bar-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
        <div className="intro-pct">{pct}%</div>
      </div>
    </div>
  );
};

export default HyperspaceIntro;
