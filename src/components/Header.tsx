import Link from 'next/link';
import React from 'react';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

import HeaderStyles from './styles/HeaderStyles';

export default function Header() {
  return (
    <HeaderStyles>
      <h1 className="logo">
        <Link href="/">Click To Buy</Link>
      </h1>
      <nav className="nav">
        <Link href="/products">Products</Link>
        <Link href="/sell">Sell</Link>
        <Link href="/order">Order</Link>
        <Link href="/account">Account</Link>
      </nav>
      <div className="icons">
        <FaSearch size={20} color="var(--shipGray)" />
        <FaShoppingCart size={20} color="var(--shipGray)" />
        <FaBars size={20} color="var(--shipGray)" />
      </div>
    </HeaderStyles>
  );
}
