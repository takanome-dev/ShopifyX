/* eslint-disable react/jsx-props-no-spreading */
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import '@style/nprogress.css';
import '@style/globals.css';

import Page from '@components/Page';

import type { AppProps } from 'next/app';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
