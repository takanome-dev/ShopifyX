import { NextPage } from 'next';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

// import Footer from './Footer'
import Header from './Header';
import GlobalStyles from './styles/Global';

const Container = styled.main`
  max-width: var(--maxWidth);
  margin: 3rem auto;
  padding: 0 2rem;
`;

type Props = {
  children: ReactNode;
};

const Page: NextPage<Props> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Container>{children}</Container>
      {/* <Footer /> */}
    </>
  );
};

export default Page;
