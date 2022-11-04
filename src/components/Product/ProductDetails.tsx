import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaDollarSign, FaShoppingBag } from 'react-icons/fa';

import FavIcon from '@components/common/FavIcon';
import { Product } from '@components/types';
import { useCartItems } from '@context/CartProvider';
import formatMoney from '@lib/formatMoney';

// import { CardList } from '../Card';
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
  const { addToCart } = useCartItems();

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
      <div className="grid grid-cols-[0.5fr,1fr] gap-x-12">
        <div className="relative overflow-hidden border shadow-md rounded-2xl">
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
          <FavIcon className="top-8 right-8" />
        </div>
        <div className="">
          <h1 className="mb-8 text-5xl font-bold">{data?.product.name}</h1>
          <p className="mb-8 text-3xl font-semibold">
            {formatMoney(data?.product.price)}
          </p>
          <div className="">
            <p className="text-2xl text-gray-400">Description:</p>
            <p className="mt-4 text-2xl">{data?.product.description}</p>
          </div>
          <div className="mt-12 flex">
            <Button
              title="Buy now"
              className="text-3xl"
              variant="primary"
              Icon={FaDollarSign}
              iconPosition="start"
              size="md"
            />
            <Button
              title="Add to cart"
              className="ml-8 text-3xl border-2"
              variant="secondary"
              Icon={FaShoppingBag}
              iconPosition="start"
              size="md"
              onClick={() => addToCart({ product: data!.product, quantity: 1 })}
            />
          </div>
        </div>
      </div>
      {/* TODO: review similar products */}
      {/* <div className="mt-12">
        <h2 className="mb-8 text-3xl font-semibold">Similar Products</h2>
        <CardList />
      </div> */}
    </div>
  );
};

export default ProductDetails;
