/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Header from '@/components/Header';
import GlobalStyles from '@/components/styles/Global';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
