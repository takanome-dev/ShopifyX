/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Page from '@components/Page';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
