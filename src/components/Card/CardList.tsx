import React from 'react';

import { Product } from '@interfaces/product';

import Card from './Card';

interface Props {
  products: Product[];
}

export default function CardList({ products }: Props) {
  return (
    <div className="card-container grid grid-cols-[repeat(auto-fill,_minmax(30rem,_1fr))] gap-8">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
