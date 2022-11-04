import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { FiLoader } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';

import formatMoney from '@lib/formatMoney';

import { Product } from '../types';

const CardOrderProduct = ({ product }: { product: Product }) => {
  const borderColor =
    product.orderStatus === 'delivered'
      ? 'border-l-green-400'
      : product.orderStatus === 'processing'
      ? 'border-l-yellow-400'
      : 'border-l-red-400';

  return (
    <div className={`p-8 product-order border border-l-4 ${borderColor}`}>
      <div className="grid grid-cols-[150px_1fr] gap-x-8 mb-8">
        <div className="overflow-hidden border-2 rounded-2xl">
          <Image
            src={product.photo.image.publicUrlTransformed}
            alt={product.name}
            width="100%"
            height="100%"
            className="object-cover"
            layout="responsive"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
          />
        </div>
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="text-3xl font-semibold">{product.name}</h3>
            <p className="text-2xl font-semibold">
              {formatMoney(product.price)}
            </p>
          </div>
          <p className="text-xl">{product.description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="flex text-2xl">
          {product.orderStatus === 'delivered' ? (
            <>
              <BsPatchCheckFill className="items-center mr-4 text-3xl text-green-500" />
              Delivered on March 09,2022
            </>
          ) : product.orderStatus === 'processing' ? (
            <>
              <FiLoader className="items-center mr-4 text-3xl text-yellow-500" />
              Delivering...
            </>
          ) : (
            <>
              <MdCancel className="items-center mr-4 text-3xl text-red-500" />
              Canceled on March 09,2022
            </>
          )}
        </p>
        <Link href="#">
          <a className="text-2xl font-semibold text-blue-500 underline">
            View product
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CardOrderProduct;
