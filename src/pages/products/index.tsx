import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Card from '@/components/card';
import Pagination from '@/components/pagination';
import { ALL_PRODUCTS_QUERY } from '@/gql/product';
import { ProductsQuery } from '@/interfaces/product';
import { WithPageLayout } from '@/interfaces/with-page-layout';
import MainLayout from '@/layouts/main-layout';

const ProductPage: WithPageLayout = () => {
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
    <>
      <Head>
        <title>ClickToBuy | Products</title>
      </Head>
      <div className="pb-8">
        <div className="card-container grid grid-cols-[repeat(auto-fill,_minmax(30rem,_1fr))] gap-8">
          {data?.products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <Pagination page={+currentPage} pageSize={PAGE_SIZE} />
      </div>
    </>
  );
};

ProductPage.PageLayout = MainLayout;
export default ProductPage;
