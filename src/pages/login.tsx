import Head from 'next/head';
import React from 'react';

import Login from '@components/Login';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>ClickToBuy | Login</title>
      </Head>
      <Login />
    </>
  );
}
