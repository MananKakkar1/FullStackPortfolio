import React, { createContext, useContext, useState, useEffect } from "react";

const themes = ["theme-dark", "theme-red", "theme-animated", "theme-starwars"];
const ThemeContext = createContext({
  theme: "theme-dark",
  setTheme: (_t: string) => {},
  themes,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Read initial theme from localStorage, fallback to 'theme-dark'
  const [theme, setThemeState] = useState(
    () => localStorage.getItem("theme") || "theme-dark"
  );

  useEffect(() => {
    document.body.classList.remove(...themes);
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme); // Persist theme
  }, [theme]);

  const setTheme = (t: string) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
