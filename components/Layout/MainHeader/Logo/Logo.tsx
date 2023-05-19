import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link href="/">
      <img
        className={`${styles.img} ${styles.light}`}
        src="/logo/logo-light.svg"
        alt="logo"
      />
      <img
        className={`${styles.img} ${styles.dark}`}
        src="/logo/logo-dark.svg"
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
