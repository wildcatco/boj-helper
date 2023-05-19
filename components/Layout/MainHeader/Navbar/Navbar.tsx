import { useRouter } from 'next/router';

import { signOut } from 'next-auth/react';

import styles from './Navbar.module.scss';
import NavbarItem from './NavbarItem';

const MENU_ITEMS = [
  { path: '/', name: '문제 풀기' },
  { path: '/problems', name: '문제 저장소' },
  { path: '/exercise', name: '문제 연습' },
  { path: '/snippets', name: '코드 스니핏' },
];

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { pathname } = useRouter();

  const handleLogout = () => {
    return signOut({ callbackUrl: pathname });
  };

  return (
    <nav className={styles.navbar}>
      {MENU_ITEMS.map((item) => (
        <NavbarItem
          key={item.name}
          name={item.name}
          href={item.path}
          active={pathname === item.path}
        />
      ))}
      {isLoggedIn ? (
        <NavbarItem name="로그아웃" onClick={handleLogout} />
      ) : (
        <NavbarItem
          name="로그인"
          href="/signin"
          active={pathname === '/signin'}
        />
      )}
    </nav>
  );
};

export default Navbar;
