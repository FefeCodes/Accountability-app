import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setTheme = (theme) => {
    setIsDarkMode(theme === "dark");
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme,
    setTheme,
    theme: isDarkMode ? "dark" : "light",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
