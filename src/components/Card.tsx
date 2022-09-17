import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCartPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import formatMoney from '@lib/formatMoney';

import { Product } from './types';

export default function Card({ product }: { product: Product }) {
  return (
    <div className="relative border border-gray-300 rounded-2xl">
      <Image
        src={product.photo}
        alt={product.name}
        width={400}
        height={350}
        className="object-cover rounded-2xl"
        layout="responsive"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
      />
      <div className="flex flex-col items-center px-4">
        <Link href={`/products/${product.id}`}>
          <a className="w-full px-8 py-2 -mt-8 overflow-hidden text-5xl font-semibold text-center -skew-x-6 text-ellipsis whitespace-nowrap hover:underline bg-gradient-to-r from-cyan to-teal -rotate-2">
            {product.name}
          </a>
        </Link>
        <p className="absolute px-4 py-2 text-3xl font-semibold -skew-x-6 bg-gradient-to-r from-cyan to-teal rotate-2 -top-1 -right-1">
          {formatMoney(product.price)}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-px auto-rows-[50px] border-t border-t-gray-300">
        <div className="flex items-center justify-center cursor-pointer">
          <FaPencilAlt size={20} className="text-gray-700 " />
        </div>
        <div className="flex items-center justify-center border-l cursor-pointer border-l-gray-300">
          <FaCartPlus size={20} className="text-gray-700" />
        </div>
        <div className="flex items-center justify-center border-l cursor-pointer border-l-gray-300">
          <FaTrashAlt size={20} className="text-red" />
        </div>
      </div>
    </div>
  );
}
