import Link from 'next/link';

import clsx from 'clsx';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

import styles from './Button.module.scss';

interface ButtonProps {
  outlined?: boolean;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  outlined,
  onClick,
  loading,
  disabled,
  children,
  href,
  className,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        outlined ? styles.outlined : styles.base,
        loading && styles.loading,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {href ? (
        <Link className={styles.link} href={href}>
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
      {loading && <LoadingSpinner className={styles.spinner} />}
    </button>
  );
};

export default Button;
