import { Particles } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: "#ffffff" },
    number: { value: 120, density: { enable: true } },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: { enable: true, speed: 0.4, sync: false },
    },
    size: { value: { min: 0.5, max: 1.8 } },
    move: {
      enable: true,
      direction: "none",
      speed: { min: 0.05, max: 0.2 },
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    twinkle: { particles: { enable: true, frequency: 0.05, opacity: 1 } },
  },
  detectRetina: true,
};

const ParticleBackground = () => (
  <Particles
    id="starfield"
    options={options}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}
  />
);

export default ParticleBackground;
