import { useState } from "react";
import { useTheme } from "./ThemeContext";
import './css_files/Themes.css';

const themePreviews: Record<'theme-dark' | 'theme-red' | 'theme-animated' | 'theme-starwars', string> = {
    "theme-dark": "Dark Theme",
    "theme-red": "Red Theme",
    "theme-animated": "Animated Theme",
    "theme-starwars": "Star Wars Theme",
};

const ThemeSelector = () => {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="change-theme-btn" onClick={() => setOpen(true)}>
        Change Theme
      </button>
      {open && (
        <div className="theme-selector-modal-overlay" onClick={() => setOpen(false)}>
          <div className="theme-selector-modal" onClick={e => e.stopPropagation()}>
            <h3>Select a Theme</h3>
            <div className="theme-selector-options">
              {themes.map((t) => (
                <button
                  key={t}
                  className={`theme-selector-option${theme === t ? " selected" : ""}`}
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
            <button className="theme-selector-close" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector
