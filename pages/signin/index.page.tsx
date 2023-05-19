import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import * as process from 'process';

import Layout from '@/components/Layout';
import Button from '@/components/ui/Button';
import LoginButton from '@/components/ui/LoginButton';
import { SUPPORTED_PROVIDERS } from '@/libs/constants/providers';
import { Provider } from '@/types/provider';

import styles from './index.module.scss';

const SignInPage = () => {
  const router = useRouter();
  const { error, callbackUrl } = router.query;
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  useEffect(() => {
    if (callbackUrl) {
      alert('로그인 후 이용해주세요.');
    }
  }, [callbackUrl, error]);

  const handleSignIn = (provider: Provider) => () => {
    setButtonIsDisabled(true);

    void signIn(provider, {
      callbackUrl: (callbackUrl && String(callbackUrl)) || '/',
    });
  };

  const handleTestUserLogin = async () => {
    const response = await axios.post('/api/auth/test-user');

    if (response.status === 200) {
      router
        .push(typeof callbackUrl === 'string' ? callbackUrl : '/')
        .then(() => window.location.reload());
    }
  };

  return (
    <Layout hasHeader title="로그인">
      <div className={styles.container}>
        {SUPPORTED_PROVIDERS.map((provider) => (
          <LoginButton
            key={provider}
            social={provider}
            onSignIn={handleSignIn(provider)}
            disabled={buttonIsDisabled}
          />
        ))}
        {process.env.NODE_ENV !== 'production' && (
          <Button className={styles.testUser} onClick={handleTestUserLogin}>
            테스트 유저 로그인
          </Button>
        )}
      </div>
    </Layout>
  );
};

export default SignInPage;
