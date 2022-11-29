import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import { Product, ProductsQuery } from '@interfaces/product';

import { CardList } from '../Card';
import Pagination from '../Pagination';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int!, $take: Int!) {
    products(skip: $skip, take: $take) {
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
  const router = useRouter();
  const PAGE_SIZE = 6;
  const currentPage = router.query.page ?? 1;

  const { data, error, loading } = useQuery<ProductsQuery>(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: +currentPage * PAGE_SIZE - PAGE_SIZE,
      take: PAGE_SIZE,
    },
  });

  // TODO: add loader
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="pb-8">
      <CardList products={data?.products as Product[]} />
      <Pagination page={+currentPage} pageSize={PAGE_SIZE} />
    </div>
  );
}
