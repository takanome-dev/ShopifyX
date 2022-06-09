import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  width: 30rem;
  border: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: repeat(5, auto);
  border-radius: 1rem;
  margin: 3rem auto;
  overflow: hidden;

  a,
  p {
    padding: 1rem;
    border-right: 1px solid var(--lightGray);
    font-size: 1.5rem;
  }
`;

export default function Pagination() {
  return (
    <PaginationStyles>
      <Link href="/#">⬅ Prev</Link>
      <p>1</p>
      <p>..</p>
      <p>10</p>
      <Link href="/#"> ➡️ Next</Link>
    </PaginationStyles>
  );
}
