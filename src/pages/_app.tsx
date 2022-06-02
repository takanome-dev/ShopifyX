/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// import Footer from '@components/Footer';
import Header from '@components/Header';
import GlobalStyles from '@styles/Global';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
