import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { Product } from '@components/types';
import paginate from '@lib/paginate';

import { CardList } from '../Card';
import Pagination from '../Pagination';

interface ProductsQuery {
  products: Product[];
}

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      name
      description
      price
      stock
      status
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, loading } = useQuery<ProductsQuery>(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const products = paginate<Product>(data?.products, currentPage, PAGE_SIZE);

  return (
    <div className="pb-8">
      <CardList products={products} />
      <Pagination />
    </div>
  );
}
