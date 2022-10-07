import React from 'react';

import { CardList } from '../Card';
import Pagination from '../Pagination';

export default function Products() {
  return (
    <div className="pb-8">
      <CardList />
      <Pagination />
    </div>
  );
}
