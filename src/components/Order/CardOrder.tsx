import React from 'react';

import { Product } from '@interfaces/product';

import CardOrderHeader from './CardOrderHeader';
import CardOrderProduct from './CardOrderProduct';

interface Props {
  product: Product;
}

const CardOrder = ({ product }: Props) => (
  <div className="mt-12 border divide-y rounded-xl">
    <CardOrderHeader />
    <CardOrderProduct product={product} />
    <CardOrderProduct product={product} />
  </div>
);

export default CardOrder;
