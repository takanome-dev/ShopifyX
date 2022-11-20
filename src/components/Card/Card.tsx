import Image from 'next/image';
import React from 'react';
import { BsCartPlusFill } from 'react-icons/bs';

import FavIcon from '@components/common/FavIcon';
import Link from '@components/common/Link';
import { useCartItems } from '@context/CartProvider';
import formatMoney from '@lib/formatMoney';

import { Product } from '../types';

export default function Card({ product }: { product: Product }) {
  const { addToCart } = useCartItems();

  return (
    <div className="card relative border border-gray-300 rounded-2xl p-4">
      <div className="relative">
        <Image
          src={product.photo?.image?.publicUrlTransformed}
          alt={product.name}
          width={450}
          height={350}
          className="card-image object-cover rounded-2xl"
          layout="responsive"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
        />
        <FavIcon className="top-4 right-4" />
      </div>
      <div className="flex flex-col px-4 mt-8 mb-4">
        <Link
          path={`/products/${product.id}`}
          title={product.name}
          className="card-title w-full mb-8 overflow-hidden text-4xl font-semibold text-ellipsis whitespace-nowrap"
        />
        <div className="flex items-center justify-between">
          <p className="card-price text-3xl font-semibold">
            {formatMoney(product.price)}
          </p>
          <p
            className={`card-stock text-2xl ${
              product.stock > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="card-seller text-gray-500 text-2xl">
            seller <Link path="/" title="@Takanome" className="text-blue-500" />
          </p>
          <button type="button" className="p-4 hover:bg-gray-200 rounded-full">
            <BsCartPlusFill
              size={20}
              onClick={() => addToCart({ product, quantity: 1 })}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
