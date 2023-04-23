import { NextPage } from 'next';
import { ReactNode, useState } from 'react';

import Cart from '@/components/cart/cart';
import Header from '@/components/header';

type Props = {
  children: ReactNode;
};

const MainLayout: NextPage<Props> = ({ children }) => (
  <>
    <Header />
    <main className="max-w-screen-xl px-8 mx-auto my-12">{children}</main>
    <Cart />
    {/* <Footer /> */}
  </>
);

export default MainLayout;
