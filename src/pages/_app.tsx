/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  // HttpLink,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import '@style/nprogress.css';
import '@style/globals.css';

import Page from '@components/Page';
import AuthProvider from '@context/AuthProvider';
import CartProvider from '@context/CartProvider';

import type { AppProps } from 'next/app';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_API_URI as string,
// });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path!}`
      )
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// this uses apollo-link-http under the hood, so all the options here come from that package
const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URI as string,
  // pass the headers along from this request. This enables SSR with logged in state
  // Headers: ,
  // credentials: 'include',
});

const client = new ApolloClient({
  link: from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
  credentials: 'include',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
