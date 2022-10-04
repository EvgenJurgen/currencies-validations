import React, { useContext } from "react";
import { ThemeContext } from "../../context";
import { Switch } from "../switch";
import styles from "./header.module.scss";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.container}>
      <div className={styles.switch}>
        <Switch onChange={toggleTheme} checked={theme === "dark"} />
      </div>
    </header>
  );
};
