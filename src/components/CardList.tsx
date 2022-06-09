import React from 'react';

import Card from './Card';
import products from './products.json';
import CardListStyles from './styles/CardListStyles';

export default function CardList() {
  return (
    <CardListStyles>
      {products.map((p) => (
        <Card key={p.id} product={p} />
      ))}
    </CardListStyles>
  );
}
