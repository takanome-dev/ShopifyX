import { gql, useMutation } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FaSearch, FaBars } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';

import Button from '@/components/common/Button';
import { useCartItems } from '@/context/CartProvider';
import { CURRENT_USER_QUERY, SIGN_OUT_MUTATION } from '@/gql/user';
import useCurrentUser from '@/hooks/useCurrentUser';

import Search from './search';
import UserAvatar from './user-avatar';

interface HeaderProps {
  handleOpen: () => void;
}

export default function Header({ handleOpen }: HeaderProps) {
  const [openSearch, setOpenSearch] = useState(false);
  const { user } = useCurrentUser();
  const { cartItems } = useCartItems();
  const router = useRouter();
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <>
      <header className="sticky top-0 z-10 bg-white shadow-md bg-opacity-80 backdrop-blur-md">
        <nav className="grid grid-cols-[auto_1fr_auto] items-center max-w-screen-xl mx-auto px-10 xl:px-0">
          <Link href="/" className="flex gap-4 border border-red-500">
            <Image src="/logo.svg" alt="ShopifyX logo" width={40} height={40} />
            <span className="text-4xl font-bold self-end text-slate-600">
              ShopifyX
            </span>
          </Link>
          {user && (
            <nav className="justify-center hidden md:flex">
              <Link
                href="/products"
                className="m-8 text-3xl relative font-semibold text-gray-700 uppercase before:content-[''] before:h-1.5 before:w-0 before:bg-gradient-to-r before:from-cyan before:to-teal before:absolute before:left-0 before:mt-9 before:transition-all before:duration-[300ms] hover:before:w-full"
              >
                Products
              </Link>
              <Link
                href="/sell"
                className="m-8 text-3xl relative font-semibold text-gray-700 uppercase before:content-[''] before:h-1.5 before:w-0 before:bg-gradient-to-r before:from-cyan before:to-teal before:absolute before:left-0 before:mt-9 before:transition-all before:duration-[300ms] hover:before:w-full"
              >
                Sell
              </Link>
              <Link
                href="/orders"
                className="m-8 text-3xl relative font-semibold text-gray-700 uppercase before:content-[''] before:h-1.5 before:w-0 before:bg-gradient-to-r before:from-cyan before:to-teal before:absolute before:left-0 before:mt-9 before:transition-all before:duration-[300ms] hover:before:w-full"
              >
                Orders
              </Link>
            </nav>
          )}
          <div className="flex justify-end items-center">
            <div
              className={
                user ? 'mr-8 flex items-center' : 'mr-16 flex items-center'
              }
            >
              <button
                type="button"
                className="border border-gray-200 pl-3 pr-10 py-3 flex items-center rounded-lg"
                onClick={() => setOpenSearch(true)}
              >
                <FaSearch size={18} className="text-gray-500" />
                <p className="ml-4 text-xl text-gray-500">Search...</p>
              </button>
              <div className="cart-icon relative ml-12">
                <MdShoppingCart
                  size={20}
                  className="text-gray-700 cursor-pointer"
                  onClick={handleOpen}
                />
                {cartItems.length > 0 && (
                  <p className="total-cart-items absolute -top-5 -right-5 bg-red-500 w-8 h-8 flex items-center justify-center text-white text-xl font-semibold rounded-full">
                    {cartItems.length}
                  </p>
                )}
              </div>
              <FaBars
                size={20}
                className="block ml-8 text-gray-700 cursor-pointer md:hidden"
              />
            </div>
            <UserAvatar />
          </div>
        </nav>
      </header>
      <Search
        isSearchOpen={openSearch}
        onSearchClose={() => setOpenSearch(false)}
      />
    </>
  );
}
