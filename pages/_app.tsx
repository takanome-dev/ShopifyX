/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Header from '@/components/Header';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
