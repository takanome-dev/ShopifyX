import Head from 'next/head';
import React from 'react';

import { Products } from '@components/Product';

export default function ProductPage() {
  return (
    <>
      <Head>
        <title>ClickToBuy | Products</title>
      </Head>
      <Products />
    </>
  );
}
