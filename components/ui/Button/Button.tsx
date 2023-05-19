import Link from 'next/link';

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
  const content = loading ? <LoadingSpinner /> : children;

  return (
    <button
      className={`${styles.button} ${
        outlined ? styles.outlined : styles.base
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {href ? (
        <Link className={styles.link} href={href}>
          {content}
        </Link>
      ) : (
        content
      )}
    </button>
  );
};

export default Button;
