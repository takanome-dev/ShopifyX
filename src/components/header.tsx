import { Search, ShoppingBag, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import products from '@/components/products.json';
import { Button } from '@/components/ui/button';
import { useCartItems } from '@/context/CartProvider';
import useCurrentUser from '@/hooks/useCurrentUser';

import SearchDialog from './search-dialog';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import UserAvatar from './user-avatar';

interface HeaderProps {
  handleOpen: () => void;
}

const HeaderLink = ({ path, title }: { path: string; title: string }) => (
  <Link
    href={path}
    className="text-xl relative font-semibold text-gray-700 uppercase before:content-[''] before:h-1 before:w-0 before:bg-gradient-to-r before:from-primary before:to-secondary before:absolute before:left-0 before:mt-7 before:transition-all before:duration-[300ms] hover:before:w-full"
  >
    {title}
  </Link>
);

export default function Header({ handleOpen }: HeaderProps) {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setSearchQuery] = useState('');
  const { user } = useCurrentUser();
  const { cartItems } = useCartItems();

  const router = useRouter();

  const filteredProducts =
    query === ''
      ? products
      : products.filter((product) =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md bg-opacity-80 backdrop-blur-md">
      <nav className="grid grid-cols-[auto_1fr_auto] h-16 items-center max-w-screen-xl mx-auto px-10 xl:px-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="ShopifyX logo" width={36} height={36} />
          <span className="text-3xl font-semibold text-slate-700">
            Shopify
            <small className="from-primary to-secondary bg-clip-text text-transparent bg-gradient-to-b text-4xl">
              X
            </small>
          </span>
        </Link>
        {user && (
          <nav className="justify-center hidden md:flex gap-8">
            <HeaderLink path="/products" title="Products" />
            <HeaderLink path="/sell" title="Sell" />
            <HeaderLink path="/orders" title="Orders" />
          </nav>
        )}
        <div className="flex justify-end items-center gap-8">
          <SearchDialog />
          <div className="cart-icon relative">
            <ShoppingBag
              className="text-slate-700 w-6 h-6 cursor-pointer"
              onClick={handleOpen}
            />
            {cartItems.length > 0 && (
              <p className="total-cart-items absolute -top-3 -right-3 bg-red-500 w-6 h-6 flex items-center justify-center text-white font-semibold rounded-full">
                {cartItems.length}
              </p>
            )}
          </div>
          <Menu className="block text-gray-700 w-6 h-6 cursor-pointer md:hidden" />
          <UserAvatar />
        </div>
      </nav>
    </header>
  );
}
