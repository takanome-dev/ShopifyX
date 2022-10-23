import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';

import { useCurrentUser } from 'src/hooks/useCurrentUser';

import Button from './common/Button';
import HeaderLink from './common/HeaderLink';

interface HeaderProps {
  handleOpen: () => void;
}

export default function Header({ handleOpen }: HeaderProps) {
  const user = useCurrentUser();
  console.log('====================================');
  console.log({ user });
  console.log('====================================');
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md bg-opacity-80 backdrop-blur-md">
      <nav className="grid grid-cols-[auto_1fr_auto] items-center max-w-screen-xl mx-auto px-10 xl:px-0">
        <h1 className="p-4 text-5xl text-gray-900 uppercase bg-gradient-to-r from-cyan to-teal">
          <Link href="/">Logo</Link>
        </h1>
        {user && (
          <nav className="justify-center hidden md:flex">
            <HeaderLink name="Products" path="products" />
            <HeaderLink name="Sell" path="sell" />
            <HeaderLink name="Order" path="orders" />
            <HeaderLink name="Account" path="account" />
          </nav>
        )}
        <div className="flex justify-end items-center">
          <div className={user ? 'mr-0' : 'mr-16 flex'}>
            <FaSearch size={20} className="text-gray-700 cursor-pointer" />
            <FaShoppingCart
              size={20}
              className="ml-8 text-gray-700 cursor-pointer"
              onClick={handleOpen}
            />
            <FaBars
              size={20}
              className="block ml-8 text-gray-700 cursor-pointer md:hidden"
            />
          </div>
          {!user && (
            <Button
              title="Signin"
              className="border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
              size="xs"
              onClick={() => {
                void router.push('/login');
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
