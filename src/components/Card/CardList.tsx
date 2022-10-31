import React from 'react';

import { Product } from '@components/types';

// import products from '../products.json';

import Card from './Card';

export default function CardList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(30rem,_1fr))] gap-8">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
