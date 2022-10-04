import React, { FC, useEffect, useState } from "react";
import { Theme, ThemeContext } from "../../context";

export const CURRENT_THEME_KEY = "_CURRENT_THEME_KEY";

const getTheme = (): Theme => {
  return (localStorage.getItem(CURRENT_THEME_KEY) as Theme) || "light";
};

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(getTheme);

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(CURRENT_THEME_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
