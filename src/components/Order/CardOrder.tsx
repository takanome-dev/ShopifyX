import React from 'react';

import { Product } from '@components/types';

import CardOrderHeader from './CardOrderHeader';
import CardOrderProduct from './CardOrderProduct';

const CardOrder = ({ product }: { product: Product }) => {
  const borderColor =
    // eslint-disable-next-line no-nested-ternary
    product.orderStatus === 'delivered'
      ? 'border-l-green-400'
      : product.orderStatus === 'processing'
      ? 'border-l-yellow-400'
      : 'border-l-red-400';

  return (
    <div
      className={`mt-12 border border-l-4 divide-y ${borderColor} rounded-xl`}
    >
      <CardOrderHeader />
      <CardOrderProduct product={product} />
      <CardOrderProduct product={product} />
    </div>
  );
};

export default CardOrder;
