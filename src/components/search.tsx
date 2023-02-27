import { useQuery } from '@apollo/client';
import { Combobox, Transition } from '@headlessui/react';
import { Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import { ALL_PRODUCTS_QUERY } from '@/gql/product';
import { Product, ProductsQuery } from '@/interfaces/product';

interface Props {
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

export default function Search({ isSearchOpen, onSearchClose }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Product | null>(null);
  const [query, setQuery] = useState('');
  const { data } = useQuery<ProductsQuery>(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: 0,
      take: 100,
    },
  });

  useEffect(() => {
    if (selected?.id) {
      router.push(`/products/${selected.id}`).catch(console.error);
      onSearchClose();
      setSelected(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  if (!isSearchOpen) return null;

  const filteredProducts =
    query === ''
      ? data?.products
      : data?.products.filter((product) =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <>
      <div
        className="fixed inset-0 z-10 transition ease-in-out bg-black/40"
        aria-hidden="true"
        onClick={onSearchClose}
      />
      <div className="fixed top-52 left-1/2 -translate-x-1/2 bg-white z-20 w-1/3 rounded-md">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative p-8">
            <div className="relative flex items-center w-full cursor-default rounded-md bg-white text-left border">
              <SearchIcon size={17} className="ml-4 text-gray-500" />
              <Combobox.Input
                autoFocus
                className="w-full outline-none p-4 text-2xl leading-6 text-gray-700 focus-visible:ring-0 rounded-lg"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(product: Product) => product?.name}
              />
            </div>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-4 pb-8 -ml-8 max-h-96 w-full overflow-auto bg-white py-1 text-2xl shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filteredProducts?.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none text-center mt-8 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredProducts?.map((product) => (
                    <Combobox.Option
                      key={product.id}
                      className={({ active }) =>
                        `relative cursor-default select- mx-8 py-3 pl-4 rounded-md ${
                          active ? 'bg-cyan text-white' : 'text-gray-700'
                        }`
                      }
                      value={product}
                    >
                      {({ active }) => (
                        <Link
                          href={`/products/${product.id}`}
                          className={`block truncate text-2xl ${
                            active ? 'font-semibold' : 'font-medium'
                          }`}
                        >
                          {product.name}
                        </Link>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
}
