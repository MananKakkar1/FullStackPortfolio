import { useState, useEffect, useRef } from "react";

export function useScrollTypewriter(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const tick = () => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i < text.length) {
              setTimeout(tick, speed);
            } else {
              setDone(true);
            }
          };
          setTimeout(tick, speed);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed]);

  return { ref, displayed, done };
}
