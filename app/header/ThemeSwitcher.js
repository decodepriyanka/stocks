"use client"

import { useTheme } from 'next-themes';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <label className={styles.switch}>
        <input type="checkbox" checked={theme === 'dark'} onChange={handleThemeToggle} />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
      <span className={styles.themeLabel}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
};

export default ThemeSwitcher;
