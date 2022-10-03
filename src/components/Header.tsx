import Link from 'next/link';
import React from 'react';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

import HeaderLink from './common/HeaderLink';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-md bg-opacity-80 backdrop-blur-md">
      <nav className="grid grid-cols-[auto_1fr_auto] items-center max-w-screen-xl mx-auto px-10 xl:px-0">
        <h1 className="p-4 text-5xl text-gray-900 uppercase bg-gradient-to-r from-cyan to-teal">
          <Link href="/">Click To Buy</Link>
        </h1>
        <nav className="justify-center hidden md:flex">
          <HeaderLink name="Products" path="products" />
          <HeaderLink name="Sell" path="sell" />
          <HeaderLink name="Order" path="orders" />
          <HeaderLink name="Account" path="account" />
        </nav>
        <div className="flex justify-end">
          <FaSearch size={20} className="text-gray-700 cursor-pointer" />
          <FaShoppingCart
            size={20}
            className="ml-8 text-gray-700 cursor-pointer"
          />
          <FaBars
            size={20}
            className="block ml-8 text-gray-700 cursor-pointer md:hidden"
          />
        </div>
      </nav>
    </header>
  );
}
