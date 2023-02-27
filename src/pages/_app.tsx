import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import Router from 'next/router';
import NProgress from 'nprogress';
import '@/styles/nprogress.css';
import '@/styles/globals.css';

import CartProvider from '@/context/CartProvider';

import type { AppPropsType } from 'next/dist/shared/lib/utils';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_API_URI as string,
// });

type ComponentWithPageLayout = AppPropsType & {
  Component: AppPropsType['Component'] & {
    PageLayout?: React.ComponentType<any>;
  };
};

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

const uploadLink = createUploadLink({
  uri: process.env.API_URI as string,
  // pass the headers along from this request.
  // This enables SSR with logged in state
  // Headers: ,
  fetchOptions: {
    credentials: 'include',
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const client = new ApolloClient({
  link: from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </CartProvider>
    </ApolloProvider>
  );
}

export default MyApp;
