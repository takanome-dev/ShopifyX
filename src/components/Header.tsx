import Link from 'next/link';
import React from 'react';
import Nav from './Nav';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

import HeaderStyles from './styles/HeaderStyles';

export default function Header() {
  return (
    <HeaderStyles>
      <h1 className="logo">
        <Link href="/">Click To Buy</Link>
      </h1>
      <Nav />
      <div className="icons">
        <FaSearch size={20} color="var(--shipGray)" />
        <FaShoppingCart size={20} color="var(--shipGray)" />
      </div>
    </HeaderStyles>
  );
}
