import { gql, useQuery } from '@apollo/client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <div className="pagination w-[300px] grid grid-cols-[repeat(5,_auto)] rounded-2xl my-12 mx-auto overflow-hidden border border-gray-300">
      <Link
        href={`/products?page=${page - 1}`}
        className={`pagination-arrow-left flex items-center p-4 text-2xl border-r border-r-gray-300 ${
          page <= 1 ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Prev
      </Link>
      <Link
        href={`/products?page=${page >= pages ? page - 1 : page + 1}`}
        className="p-4 text-2xl border-r border-r-gray-300"
      >{`${page >= pages ? page - 1 : page}`}</Link>
      <p className="p-4 text-2xl border-r border-r-gray-300">...</p>
      <Link
        href={`/products?page=${pages}`}
        className="pagination-last-page p-4 text-2xl border-r border-r-gray-300"
      >
        {pages}
      </Link>
      <Link
        href={`/products?page=${page + 1}`}
        className={`pagination-arrow-right flex items-center p-4 text-2xl ${
          page >= pages ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        Next
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
