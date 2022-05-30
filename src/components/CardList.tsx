import React from 'react';
import styled from 'styled-components';
import Card from './Card';

import products from './products.json';

const CardListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;

  .card {
    border: 1px solid var(--lightGrey);
    border-radius: 1rem;
    position: relative;

    img {
      border-radius: 1rem;
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .description {
      display: flex;
      flex-direction: column;
      align-items: center;

      a {
        font-size: 3rem;
        font-weight: 600;
        background: var(--linear1);
        padding: 0.5rem 2rem;
        transform: skew(-4deg) rotate(-2deg);
        margin-top: -2rem;
      }

      p {
        font-size: 2rem;
      }

      .price {
        background: var(--linear1);
        padding: 0.5rem 2rem;
        transform: skew(-4deg) rotate(3deg);
        position: absolute;
        right: -3px;
        top: -20px;
        font-weight: 600;
      }
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      grid-gap: 1px;
      border-top: 1px solid var(--lightGray);
      position: relative;
      bottom: 0;
      /* width: 100%;
      margin-top: 2rem; */

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1.5rem 0;

        span {
          margin-right: 1rem;
          font-size: 1.3rem;
        }
      }

      div + div {
        border-left: 1px solid var(--lightGray);
      }
    }
  }
`;

export default function CardList() {
  return (
    <CardListStyle>
      {products.map((p) => (
        <Card key={p.price} product={p} />
      ))}
    </CardListStyle>
  );
}
