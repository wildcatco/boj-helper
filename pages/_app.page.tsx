import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot, RecoilEnv } from 'recoil';

import '@/styles/bootstrap.scss';
import '@/styles/globals.scss';

import 'react-toastify/dist/ReactToastify.css';

if (process.env.NODE_ENV === 'development') {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="light"
            hideProgressBar
          />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
