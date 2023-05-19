import Link from 'next/link';

import styles from './NavbarItem.module.scss';

interface NavbarItemProps {
  name: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  name,
  active,
  href,
  onClick,
}) => (
  <div
    className={`${styles.navbarItem} ${active && styles.active}`}
    onClick={onClick}
  >
    {href ? <Link href={href}>{name}</Link> : name}
  </div>
);

export default NavbarItem;
