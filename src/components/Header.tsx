import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { VscSignOut } from 'react-icons/vsc';
import { gql, useMutation } from '@apollo/client';

import { CURRENT_USER_QUERY, useCurrentUser } from 'src/hooks/useCurrentUser';

import Button from './common/Button';
import HeaderLink from './common/HeaderLink';
import Link from './common/Link';

interface HeaderProps {
  handleOpen: () => void;
}

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function Header({ handleOpen }: HeaderProps) {
  const user = useCurrentUser();
  const router = useRouter();
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
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
          <div className={user ? 'mr-8 flex' : 'mr-16 flex'}>
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
          {user && (
            <Menu as="div" className="flex relative">
              <Menu.Button>
                <div className="pl-4 border-l border-cyan2-300">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-cyan2-300">
                    <img
                      src="/assets/avatar.png"
                      alt="User avatar"
                      className="w-full h-full"
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
                        <img
                          src="/assets/avatar.png"
                          alt="User avatar"
                          className="w-full h-full"
                        />
                      </div>

                      <div className="flex-col shrink">
                        <p className="text-gray-700 text-xl font-semibold">
                          {user?.username}
                        </p>

                        <p className="text-gray-500 text-sm font-normal">
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
                        className={`${
                          active && 'bg-gray-100'
                        } flex w-full items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        path="/favorites"
                        title="Favorites"
                        Icon={AiOutlineHeart}
                        className={`${
                          active && 'bg-gray-100'
                        } flex w-full items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
                      />
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Button
                        title="Logout"
                        className={`${
                          active && 'bg-gray-100'
                        } w-full rounded-md px-6 pl-8 py-4 text-2xl font-normal text-gray-700 hover:bg-gray-100`}
                        onClick={() => {
                          signout();
                          router.replace('/login');
                        }}
                        size="xs"
                        Icon={VscSignOut}
                        iconPosition="left"
                        color="text-red-500"
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
  );
}
