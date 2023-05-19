import { useState } from 'react';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Provider } from '@/types/provider';

import styles from './LoginButton.module.scss';

interface LoginButtonProps {
  social: Provider;
  onSignIn: () => void;
  disabled: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  social,
  onSignIn,
  disabled,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    onSignIn();
    setIsLoading(true);
  };

  const buttonContent =
    social === 'google' ? (
      <>
        <FcGoogle className={styles.icon} />
        google 계정으로 로그인
      </>
    ) : (
      <>
        <AiFillGithub className={styles.icon} />
        github 계정으로 로그인
      </>
    );

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={styles.loginButton}
    >
      {isLoading ? <LoadingSpinner /> : buttonContent}
    </button>
  );
};

export default LoginButton;
