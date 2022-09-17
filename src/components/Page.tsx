import { NextPage } from 'next';
import React, { ReactNode } from 'react';

// import Footer from './Footer'
import Header from './Header';

type Props = {
  children: ReactNode;
};

const Page: NextPage<Props> = ({ children }) => (
  <>
    <Header />
    <div className="max-w-[1100px] px-8 mx-auto my-12">{children}</div>
    {/* <Footer /> */}
  </>
);

export default Page;
