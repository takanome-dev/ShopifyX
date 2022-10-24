/* eslint-disable react/jsx-props-no-spreading */
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
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

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URI as string,
  cache: new InMemoryCache(),
  credentials: 'include',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

export default MyApp;
