import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const NavStyle = styled.nav`
  display: flex;
  justify-content: center;

  a {
    font-size: 2rem;
    margin: 2rem;
    position: relative;
    text-transform: uppercase;
    font-weight: 600;

    &:before {
      height: 3px;
      width: 0;
      content: '';
      background: var(--linear1);
      position: absolute;
      left: 0;
      transition: var(--animation-duration);
      margin-top: 2.7rem;
    }

    &:hover {
      &:before {
        width: 100%;
      }
    }
  }
`;

export default function Nav() {
  return (
    <NavStyle>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/order">Order</Link>
      <Link href="/account">Account</Link>
    </NavStyle>
  );
}
