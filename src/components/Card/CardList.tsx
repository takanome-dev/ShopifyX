import { gql, useQuery } from '@apollo/client';
import React from 'react';

import { Product } from '@components/types';

// import products from '../products.json';

import Card from './Card';

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

export default function CardList() {
  // TODO: type query response
  const { data, error, loading } = useQuery<ProductsQuery>(ALL_PRODUCTS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(30rem,_1fr))] gap-8">
      {data?.products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
}
