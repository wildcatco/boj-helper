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
  target?: '_blank' | '_self';
}

const Button: React.FC<ButtonProps> = ({
  outlined,
  onClick,
  loading,
  disabled,
  children,
  href,
  className,
  target = '_self',
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
        <Link
          className={styles.link}
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
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
