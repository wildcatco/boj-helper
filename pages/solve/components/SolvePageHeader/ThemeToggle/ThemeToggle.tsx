import { useTheme } from 'next-themes';

import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={styles.themeSelector} onClick={toggleTheme}>
      <div className={`${styles.button} ${styles.darkButton}`}>
        <span>dark</span>
      </div>
      <div className={`${styles.button} ${styles.lightButton}`}>
        <span>light</span>
      </div>
    </div>
  );
};

export default ThemeToggle;
