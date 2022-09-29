import React from 'react';

import { Product } from '@components/types';

import CardOrderHeader from './CardOrderHeader';
import CardOrderProduct from './CardOrderProduct';

const CardOrder = ({ product }: { product: Product }) => (
  <div className="mt-12 border divide-y rounded-xl">
    <CardOrderHeader />
    <CardOrderProduct product={product} />
    <CardOrderProduct product={product} />
  </div>
);

export default CardOrder;
