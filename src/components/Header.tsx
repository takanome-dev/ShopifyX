import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

import HeaderStyles from './styles/HeaderStyles';

export default function Header() {
  const [navbar, setNavbar] = useState(false);

  const changeBgColor = () =>
    Router.pathname === '/' && window.scrollY >= 480
      ? setNavbar(true)
      : setNavbar(false);

  useEffect(() => {
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  });

  return (
    <HeaderStyles changeColor={navbar}>
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
      </div>
    </HeaderStyles>
  );
}
