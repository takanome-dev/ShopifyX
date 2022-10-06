import { NextPage } from 'next';
import React, { ReactNode, useState } from 'react';

import Cart from './Cart';
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Page: NextPage<Props> = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const handleClose = () => setCartOpen(!cartOpen);
  const handleOpen = () => setCartOpen(!cartOpen);

  return (
    <>
      <Header handleOpen={handleOpen} />
      <main className="max-w-screen-xl px-8 mx-auto my-12">{children}</main>
      <Cart handleClose={handleClose} cartOpen={cartOpen} />
      {/* <Footer /> */}
    </>
  );
};

export default Page;
