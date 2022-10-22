import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';

import { Product } from '@components/types';
import formatMoney from '@lib/formatMoney';

import { CardList } from '../Card';
import Button from '../common/Button';

interface SingleProductQuery {
  product: Product;
}

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<SingleProductQuery>(
    SINGLE_PRODUCT_QUERY,
    {
      variables: { id },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="py-20">
      <div className="grid grid-cols-2 gap-x-12">
        <div className="overflow-hidden border shadow-md rounded-2xl">
          <Image
            src={data?.product.photo.image.publicUrlTransformed as string}
            alt={data?.product.name}
            width={400}
            height={350}
            className="object-cover"
            layout="responsive"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="">
          <h1 className="mb-8 text-5xl font-bold">{data?.product.name}</h1>
          <p className="mb-8 text-3xl font-semibold">
            {formatMoney(data?.product.price)}
          </p>
          <p className="mb-8 text-2xl">{data?.product.description}</p>
          <Button
            title="Add to cart"
            className="flex justify-center w-full text-center border-none shadow-md bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/30 hover:opacity-80"
            Icon={FaShoppingBag}
            iconPosition="left"
            size="lg"
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="mb-8 text-3xl font-semibold">Similar Products</h2>
        <CardList />
      </div>
    </div>
  );
};

export default ProductDetails;
