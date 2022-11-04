import { gql, useMutation } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FaSearch, FaBars } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { VscSignOut } from 'react-icons/vsc';

import { CURRENT_USER_QUERY } from '@context/auth';
import { useAuthContext } from '@context/AuthProvider';
import { useCartItems } from '@context/CartProvider';

import Button from './common/Button';
import HeaderLink from './common/HeaderLink';
import Link from './common/Link';
import Search from './Search';

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
  const { user } = useAuthContext();
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
              <div className="relative ml-12">
                <MdShoppingCart
                  size={20}
                  className="text-gray-700 cursor-pointer"
                  onClick={handleOpen}
                />
                {cartItems.length > 0 && (
                  <p className="absolute -top-5 -right-5 bg-red-500 w-8 h-8 flex items-center justify-center text-white text-xl font-semibold rounded-full">
                    {cartItems.length}
                  </p>
                )}
              </div>
              <FaBars
                size={20}
                className="block ml-8 text-gray-700 cursor-pointer md:hidden"
              />
            </div>
            {!user && (
              <Button
                title="Signin"
                className="border-none"
                size="xs"
                variant="primary"
                onClick={() => {
                  void router.push('/login');
                }}
              />
            )}
            {user && (
              <Menu as="div" className="flex relative">
                <Menu.Button>
                  <div className="pl-4 border-l border-cyan2-300">
                    <div className="w-14 h-14 rounded-full overflow-hidden border border-cyan2-300">
                      <Image
                        src="/assets/avatar.png"
                        alt="User avatar"
                        width="100%"
                        height="100%"
                        layout="responsive"
                      />
                    </div>
                  </div>
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="z-40 absolute right-0 top-20 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <div className="flex items-center px-6 py-4 mb-2 gap-x-3">
                        <div className="flex-col shrink-0 grow-0 w-14 h-14 overflow-hidden rounded-full border-cyan2-300 border">
                          <Image
                            src="/assets/avatar.png"
                            alt="User avatar"
                            width="100%"
                            height="100%"
                            layout="responsive"
                          />
                        </div>

                        <div className="flex-col shrink w-52">
                          <p className="text-gray-700 text-2xl font-semibold">
                            {user?.username}
                          </p>

                          <p className="text-gray-500 truncate text-xl font-normal">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          path="/account"
                          title="Profile"
                          Icon={AiOutlineUser}
                          iconPosition="start"
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } flex text-2xl w-full items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
                        />
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          path="/favorites"
                          title="Favorites"
                          Icon={AiOutlineHeart}
                          iconPosition="start"
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } flex w-full text-2xl items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
                        />
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Button
                          title="Logout"
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } w-full rounded-md px-6 pl-8 py-4 font-normal text-gray-700 hover:bg-gray-100`}
                          onClick={() => {
                            signout().catch(console.error);
                            router.replace('/login').catch(console.error);
                          }}
                          size="xs"
                          Icon={VscSignOut}
                          iconPosition="start"
                          iconClasses="text-red-500"
                        />
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
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
