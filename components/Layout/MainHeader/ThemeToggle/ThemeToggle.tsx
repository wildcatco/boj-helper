import { useTheme } from 'next-themes';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';

import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <div data-testid="theme-toggle" onClick={handleThemeToggle}>
      <BsSunFill className={styles.light} />
      <BsFillMoonFill className={styles.dark} />
    </div>
  );
};

export default ThemeToggle;
