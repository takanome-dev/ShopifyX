import React from 'react';

import Card from './Card';
import products from './products.json';

export default function CardList() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(30rem,_1fr))] gap-8">
      {products.map((p) => (
        <Card key={p.id} product={p} />
      ))}
    </div>
  );
}
