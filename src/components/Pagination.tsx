import { gql, useQuery } from '@apollo/client';
import React from 'react';

import Link from './common/Link';

interface PaginationProps {
  page: number;
  pageSize: number;
  // onPageCHange: (page: number) => void;
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
  const { data } = useQuery<ProductsCountQuery>(PRODUCTS_COUNT_QUERY);
  const pages = Math.ceil(data!.productsCount / pageSize);
  console.log({ pages, page });
  // TODO: disable buttons

  return (
    <div className="w-[300px] grid grid-cols-[repeat(5,_auto)] rounded-2xl my-12 mx-auto overflow-hidden border border-gray-300">
      <Link
        path={`/products?page=${page - 1}`}
        className="p-4 text-2xl border-r border-r-gray-300"
        title="⬅️ Prev"
        disabled={page <= 1}
      />
      <Link
        path={`/products?page=${page + 1}`}
        className="p-4 text-2xl border-r border-r-gray-300"
        title={`${page}`}
      />
      <Link
        path={`/products?page=${page + 1}`}
        className="p-4 text-2xl border-r border-r-gray-300"
        title="..."
      />
      <Link
        path={`/products?page=${pages}`}
        className="p-4 text-2xl border-r border-r-gray-300"
        title={`${pages}`}
      />
      <Link
        path={`/products?page=${page + 1}`}
        className="p-4 text-2xl"
        title="➡️ Next"
        disabled={page >= pages}
      />
    </div>
  );
}
