// import Image from 'next/image';
import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';

import HeroImage from '@assets';

import Button from './common/Button';
import HeroStyles from './styles/HeroStyles';

export default function Hero() {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const image = HeroImage.src;

  return (
    <HeroStyles>
      <div className="container">
        <div className="desc">
          <h1>Every Purchase Will Be Made With Pleasure</h1>
          <p>Buying and selling of goods or services using the internet.</p>
          <Button
            title="Start shopping"
            Icon={FaArrowCircleRight}
            bgColor="var(--black)"
            color="#fff"
          />
        </div>
        <div className="product">
          <img
            src={image}
            alt="Nike Vapormax"
            // width={500}
            // height={500}
          />
        </div>
      </div>
    </HeroStyles>
  );
}
