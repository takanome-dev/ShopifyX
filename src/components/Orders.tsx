import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';

import formatMoney from '@lib/formatMoney';

import Button from './common/Button';

const product = {
  id: 1,
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  photo:
    'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
};

const Orders = () => (
  <div>
    <h1 className="mb-4 text-5xl font-bold">Order History</h1>
    <p className="mb-8 text-2xl text-gray-500">
      Check status of recent orders, manage returns and discover similar
      products
    </p>
    <div className="mt-12 border rounded-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-x-20">
          <div>
            <h2>Order Number</h2>
            <p>Lorem ipsum </p>
          </div>
          <div>
            <h2>Order Number</h2>
            <p>Lorem ipsum </p>
          </div>
          <div>
            <h2>Order Number</h2>
            <p>Lorem ipsum </p>
          </div>
        </div>
        <div>
          <Button
            title="View Order"
            className="border py-6 hover:bg-gray-100 transition"
          />
        </div>
      </div>
      <div className="product-order p-8 ">
        <div className="grid grid-cols-[150px_1fr] gap-x-8 mb-8">
          <div className="border-2 rounded-2xl overflow-hidden">
            <Image
              src={product.photo}
              alt={product.name}
              width="100%"
              height="100%"
              // width={200}
              // height={300}
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
          <p className="text-2xl flex">
            <BsPatchCheckFill className="text-green-500 mr-4 items-center" />
            Delivered on March 09,2022
          </p>
          <div className="links">
            <Link href="#">
              <a className="text-2xl underline text-blue-500 font-semibold">
                View product
              </a>
            </Link>
            <span className="mx-4 border-l-2 border-gray-400" />
            <Link href="#">
              <a className="text-2xl underline text-sky-600 font-semibold">
                Buy again
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Orders;
