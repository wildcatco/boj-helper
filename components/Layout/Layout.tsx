import Head from 'next/head';

import styles from './Layout.module.scss';
import MainHeader from './MainHeader';

interface LayoutProps {
  hasHeader?: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  hasHeader,
  children,
  title,
  description,
  className,
}) => {
  let pageTitle = 'BOJ HELPER';
  if (title) {
    pageTitle += ` - ${title}`;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      {hasHeader && <MainHeader />}
      <main className={`${styles.main} ${className}`}>{children}</main>
    </>
  );
};

export default Layout;
