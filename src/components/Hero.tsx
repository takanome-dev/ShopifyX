import React from 'react';
import styled from 'styled-components';

import { HeroImage } from '@/public/assets';
import { FaArrowCircleRight } from 'react-icons/fa';

const HeroStyle = styled.div`
  padding-top: 2rem;
  height: calc(100vh - var(--header-height));
  background: var(--linear1);

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    max-width: var(--maxWidth);
    margin: 0 auto;
  }

  .desc {
    h1 {
      font-size: 5rem;
      margin: 0;
    }

    p {
      font-size: 3rem;
    }

    button {
      padding: 1rem 2rem;
      background: var(--shipGray);
      color: #fff;
      border-radius: 0.8rem;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 2rem;
      transition: background 0.3s ease-in-out;

      span {
        margin-right: 1rem;
      }

      &:hover {
        background: var(--linear1);
        color: var(--shipGray);
      }
    }
  }

  .product {
    /* width: 500px;
    height: 600px; */
    img {
      width: 100%;
      object-fit: contain;
    }
  }
`;

export default function Hero() {
  return (
    <HeroStyle>
      <div className="container">
        <div className="desc">
          <h1>Every Purchase Will Be Made With Pleasure</h1>
          <p>Buying and selling of goods or services using the internet.</p>
          <button>
            <span>Start shopping</span>
            <FaArrowCircleRight />
          </button>
        </div>
        <div className="product">
          <img src={HeroImage.src} alt="Nike Vapormax" />
        </div>
      </div>
    </HeroStyle>
  );
}
