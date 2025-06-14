import { useState } from "react";
import { useTheme } from "./ThemeContext";
import "./css_files/Themes.css";

// Chatbot button as a simple inline button
const ChatBotButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="chatbot-fab-inline"
    onClick={onClick}
    aria-label="Open AI Chatbot"
  >
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="#4f46e5"
        strokeWidth="2"
        fill="#fff"
      />
      <path
        d="M9 12a5 5 0 1 1 10 0c0 2.5-2.5 4-5 4s-5-1.5-5-4z"
        fill="#4f46e5"
      />
      <ellipse cx="12" cy="13" rx="1" ry="1.5" fill="#fff" />
      <ellipse cx="16" cy="13" rx="1" ry="1.5" fill="#fff" />
      <path
        d="M12 17c.5.5 1.5.5 2 0"
        stroke="#4f46e5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
    <span style={{ marginLeft: 6 }}>AI Chat</span>
  </button>
);

const themePreviews: Record<
  "theme-dark" | "theme-red" | "theme-animated" | "theme-starwars",
  string
> = {
  "theme-dark": "Blue Theme",
  "theme-red": "Red Theme",
  "theme-animated": "Animated Theme",
  "theme-starwars": "Star Wars Theme",
};

const ThemeSelector = () => {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Only show non-light/darkmode themes in the modal
  const otherThemes = themes.filter(
    (t) => t !== "theme-light" && t !== "theme-darkmode"
  );

  // Sun/Moon toggle logic
  const isLight = theme === "theme-light";
  const isDarkMode = theme === "theme-darkmode";
  const showToggle = isLight || isDarkMode;
  const toggleLightDark = () =>
    setTheme(isLight ? "theme-darkmode" : "theme-light");

  // Use CSS variable for icon color
  const iconColor = "var(--card-border)";

  return (
    <div className="theme-selector-bar">
      <button
        className="theme-toggle-btn"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        onClick={toggleLightDark}
        style={{
          opacity: showToggle ? 1 : 0.5,
          pointerEvents: showToggle ? "auto" : "none",
        }}
      >
        {isLight ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            style={{ display: "block" }}
          >
            <path
              d="M19 14.5A7.5 7.5 0 1 1 13.5 5
                 A6 6 0 1 0 19 14.5Z"
              fill="none"
              stroke={iconColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            style={{ display: "block" }}
          >
            <circle
              cx="14"
              cy="14"
              r="6"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
            />
            <g stroke={iconColor} strokeWidth="2">
              <line x1="14" y1="2" x2="14" y2="6" />
              <line x1="14" y1="22" x2="14" y2="26" />
              <line x1="2" y1="14" x2="6" y2="14" />
              <line x1="22" y1="14" x2="26" y2="14" />
              <line x1="5.1" y1="5.1" x2="7.9" y2="7.9" />
              <line x1="20.1" y1="20.1" x2="22.9" y2="22.9" />
              <line x1="5.1" y1="22.9" x2="7.9" y2="20.1" />
              <line x1="20.1" y1="7.9" x2="22.9" y2="5.1" />
            </g>
          </svg>
        )}
      </button>
      <ChatBotButton onClick={() => setChatOpen(true)} />
      <button className="change-theme-btn" onClick={() => setOpen(true)}>
        Change Theme
      </button>
      {open && (
        <div
          className="theme-selector-modal-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="theme-selector-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Select a Theme</h3>
            <div className="theme-selector-options">
              {otherThemes.map((t) => (
                <button
                  key={t}
                  className={`theme-selector-option${
                    theme === t ? " selected" : ""
                  }`}
                  onClick={() => {
                    setTheme(t);
                    setOpen(false);
                  }}
                >
                  <div>{themePreviews[t as keyof typeof themePreviews]}</div>
                  <div className={`theme-preview theme-preview-${t}`} />
                </button>
              ))}
            </div>
            <button
              className="theme-selector-close"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {chatOpen && (
        <div
          className="chatbot-modal-overlay"
          onClick={() => setChatOpen(false)}
        >
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chatbot-modal-header">
              <span>AI Chatbot Assistant</span>
              <button
                className="chatbot-close-btn"
                onClick={() => setChatOpen(false)}
              >
                &times;
              </button>
            </div>
            {/* You can import and use your PortfolioChatBot component here instead */}
            <div style={{ padding: 16, color: "var(--text)" }}>
              {/* Place your chatbot UI here */}
              <strong>Chatbot goes here!</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
