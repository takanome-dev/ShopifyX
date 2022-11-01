import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { VscArrowSmallLeft, VscArrowSmallRight } from 'react-icons/vsc';

import Link from './common/Link';

interface PaginationProps {
  page: number;
  pageSize: number;
}

interface ProductsCountQuery {
  productsCount: number;
}

const PRODUCTS_COUNT_QUERY = gql`
  query {
    productsCount
  }
`;

export default function Pagination({ page, pageSize }: PaginationProps) {
  const { data, loading } = useQuery<ProductsCountQuery>(PRODUCTS_COUNT_QUERY);
  const pages = Math.ceil((data?.productsCount as number) / pageSize);

  // TODO: add loader
  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-[300px] grid grid-cols-[repeat(5,_auto)] rounded-2xl my-12 mx-auto overflow-hidden border border-gray-300">
      <Link
        path={`/products?page=${page - 1}`}
        className={`flex items-center p-4 text-2xl border-r border-r-gray-300 ${
          page <= 1 ? 'opacity-50 pointer-events-none' : ''
        }`}
        title="Prev"
        Icon={VscArrowSmallLeft}
        iconPosition="start"
      />
      <Link
        path={`/products?page=${page >= pages ? page - 1 : page + 1}`}
        className="p-4 text-2xl border-r border-r-gray-300"
        title={`${page >= pages ? page - 1 : page}`}
      />
      <p className="p-4 text-2xl border-r border-r-gray-300">...</p>
      <Link
        path={`/products?page=${pages}`}
        className="p-4 text-2xl border-r border-r-gray-300"
        title={`${pages}`}
      />
      <Link
        path={`/products?page=${page + 1}`}
        className={`flex items-center p-4 text-2xl ${
          page >= pages ? 'opacity-50 pointer-events-none' : ''
        }`}
        title="Next"
        Icon={VscArrowSmallRight}
        iconPosition="end"
      />
    </div>
  );
}
