import Link from 'next/link';

import { AiFillHome } from 'react-icons/ai';

import styles from './HomeIcon.module.scss';

const HomeIcon = () => {
  return (
    <Link href="/" className={styles.home}>
      <AiFillHome />
    </Link>
  );
};

export default HomeIcon;
