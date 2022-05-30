import CardList from '@/components/CardList';
import Hero from '@/components/Hero';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: var(--maxWidth);
  margin: 2rem auto;

  h1 {
    font-size: 3rem;
  }
`;

export default function Home() {
  return (
    <div>
      <Hero />
      <Container>
        <h1>Our products</h1>
        <CardList />
      </Container>
    </div>
  );
}
