import { useEffect, useRef, useState } from 'react';

import Logo from './Logo';
import Navbar from './Navbar';
import Profile from './Profile';
import ThemeToggle from './ThemeToggle';
import { AiOutlineMenu } from 'react-icons/ai';

import useUser from '@/hooks/useUser';

import styles from './MainHeader.module.scss';

const MainHeader = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { user, isLoggedIn } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavbarToggle = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowNavbar(false);
      }
    };

    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.headerRight}>
        <div className={styles.toggle}>
          <ThemeToggle />
        </div>
        <div className={`${!showNavbar && styles.hidden}`}>
          <Navbar isLoggedIn={isLoggedIn} />
        </div>
        {user && <Profile image={user?.image || '/default-profile.png'} />}
        <div ref={menuRef}>
          <AiOutlineMenu
            className={styles.menuIcon}
            onClick={handleNavbarToggle}
          />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
