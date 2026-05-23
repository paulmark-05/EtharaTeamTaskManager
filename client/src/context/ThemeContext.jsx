import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

const ThemeProvider = ({
  children,
}) => {
  const [darkMode, setDarkMode] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "darkMode"
        );

      return saved
        ? JSON.parse(saved)
        : false;
    });

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {
      document.body.classList.add(
        "dark"
      );
    } else {
      document.body.classList.remove(
        "dark"
      );
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;