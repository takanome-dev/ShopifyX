import { NextPage } from 'next';
import React, { ReactNode } from 'react';

import Cart from './Cart';

// import Footer from './Footer'
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Page: NextPage<Props> = ({ children }) => (
  <>
    <Header />
    <main className="max-w-screen-xl px-8 mx-auto my-12">{children}</main>
    <Cart />
    {/* <Footer /> */}
  </>
);

export default Page;
