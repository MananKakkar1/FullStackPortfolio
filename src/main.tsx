import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import SmoothScroll from "./components/SmoothScroll";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);
