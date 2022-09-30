import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';

import formatMoney from '@lib/formatMoney';

import CardList from './CardList';
import Button from './common/Button';
import products from './products.json';

const ProductDetails = () => {
  const router = useRouter();

  const { id } = router.query;
  const product = products.find((p) => p.id === +id!);

  return (
    <div className="py-20">
      <div className="grid grid-cols-2 gap-x-12">
        <div className="overflow-hidden border shadow-md rounded-2xl">
          <Image
            src={product?.photo as string}
            alt={product?.name}
            width={400}
            height={350}
            className="object-cover"
            layout="responsive"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="">
          <h1 className="mb-8 text-5xl font-bold">{product?.name}</h1>
          <p className="mb-8 text-3xl font-semibold">
            {formatMoney(product?.price)}
          </p>
          <p className="mb-8 text-2xl">{product?.description}</p>
          <Button
            title="Add to cart"
            className="flex justify-center w-full text-center border-none shadow-md bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/30 hover:opacity-80"
            // className="flex justify-center w-full py-6 text-center text-gray-700 border-none shadow-md bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/30 hover:opacity-80"
            Icon={FaShoppingBag}
            iconPosition="left"
            size="lg"
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="mb-8 text-3xl font-semibold">Similar Products</h2>
        <CardList />
      </div>
    </div>
  );
};

export default ProductDetails;
