import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';
import { FaCartPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import FavIcon from '@components/common/FavIcon';
import Link from '@components/common/Link';
import formatMoney from '@lib/formatMoney';

import { Product } from '../types';

export default function Card({ product }: { product: Product }) {
  return (
    <div className="relative border border-gray-300 rounded-2xl p-4">
      <div className="relative">
        <Image
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
          width={450}
          height={350}
          className="object-cover rounded-2xl"
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
          className="w-full mb-8 overflow-hidden text-4xl font-semibold text-ellipsis whitespace-nowrap"
        />
        {/* <Link href={`/products/${product.id}`}>
          <a className="w-full px-8 py-2 -mt-8 overflow-hidden text-5xl font-semibold text-center -skew-x-6 text-ellipsis whitespace-nowrap hover:underline bg-gradient-to-r from-cyan to-teal -rotate-2">
            {product.name}
          </a>
        </Link> */}
        {/* <p className="absolute px-4 py-2 text-3xl font-semibold -skew-x-6 bg-gradient-to-r from-cyan to-teal rotate-2 -top-1 -right-1">
          {formatMoney(product.price)}
        </p> */}
        <div className="flex items-center justify-between">
          <p className="text-3xl font-semibold">{formatMoney(product.price)}</p>
          <p
            className={`text-2xl ${
              product.stock > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>
        </div>
        <p className="mt-8 text-gray-500 text-2xl">
          seller <Link path="/" title="@Takanome" className="text-blue-500" />
        </p>
      </div>
      {/* <div className="mt-4 grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-px auto-rows-[50px] border-t border-t-gray-300">
        <div className="flex items-center justify-center cursor-pointer">
          <FaPencilAlt size={20} className="text-gray-700 " />
        </div>
        <div className="flex items-center justify-center border-l cursor-pointer border-l-gray-300">
          <FaCartPlus size={20} className="text-gray-700" />
        </div>
        <div className="flex items-center justify-center border-l cursor-pointer border-l-gray-300">
          <FaTrashAlt size={20} className="text-red" />
        </div>
      </div> */}
    </div>
  );
}
