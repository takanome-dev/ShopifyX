import { gql, useMutation } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FaSearch, FaBars } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';

import Button from '@/components/common/Button';
import HeaderLink from '@/components/common/HeaderLink';
import Link from '@/components/common/Link';
import { useCartItems } from '@/context/CartProvider';
import useCurrentUser, { CURRENT_USER_QUERY } from '@/hooks/useCurrentUser';

import Search from './search';
import UserAvatar from './user-avatar';

interface HeaderProps {
  handleOpen: () => void;
}

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

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
          <h1 className="p-4 text-5xl text-gray-900 uppercase bg-gradient-to-r from-cyan to-teal">
            <Link path="/" title="Logo" />
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
