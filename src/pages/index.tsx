import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';

import CardList from '@components/CardList';
import Button from '@components/common/Button';
import Hero from '@components/Hero';

const Container = styled.div`
  max-width: var(--maxWidth);
  margin: 2rem auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  /* button {
    position: relative;
    border: 2px solid transparent;
    background: #fff;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--linear);
      z-index: -1;
      margin: -5px;
    }
  } */
`;

export default function Home() {
  return (
    <div>
      <Hero />
      <Container>
        <h1>Our products</h1>
        <CardList />
        <Button
          title="See more"
          Icon={FaArrowCircleRight}
          bgColor="#fff"
          // color="var(--linear)"
        />
      </Container>
    </div>
  );
}
