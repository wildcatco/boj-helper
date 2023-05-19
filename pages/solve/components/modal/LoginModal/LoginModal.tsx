import { signIn } from 'next-auth/react';

import LoginButton from '@/components/ui/LoginButton';
import Modal from '@/components/ui/Modal';
import { SUPPORTED_PROVIDERS } from '@/libs/constants/providers';
import { Provider } from '@/types/provider';

import styles from './LoginModal.module.scss';

const LoginModal = () => {
  const handleSignIn = (provider: Provider) => () => {
    void signIn(provider);
  };

  return (
    <Modal name="login" isStatic={true}>
      <div className={styles.container}>
        {SUPPORTED_PROVIDERS.map((provider) => (
          <LoginButton
            key={provider}
            social={provider}
            onSignIn={handleSignIn(provider)}
            disabled={false}
          />
        ))}
      </div>
    </Modal>
  );
};

export default LoginModal;
