import React from 'react';

import { Product } from '@components/types';

import CardOrder from './CardOrder';

const product1: Product = {
  id: 1,
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  photo:
    'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
  orderStatus: 'delivered',
};
const product2: Product = {
  id: 1,
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  photo:
    'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
  orderStatus: 'processing',
};
const product3: Product = {
  id: 1,
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  photo:
    'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
  orderStatus: 'failed',
};

export default function Orders() {
  return (
    <div className="pt-5 pb-16">
      <h1 className="mb-4 text-5xl font-bold">Order History</h1>
      <p className="mb-8 text-2xl text-gray-500">
        Check status of recent orders, manage returns and discover similar
        products
      </p>
      <CardOrder product={product2} />
      <CardOrder product={product1} />
      <CardOrder product={product3} />
    </div>
  );
}
