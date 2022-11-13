/* eslint-disable import/exports-last */

import { gql, useQuery } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FaDollarSign, FaPencilAlt, FaShoppingBag } from 'react-icons/fa';

import ErrorMessage from '@components/common/ErrorMessage';
import FavIcon from '@components/common/FavIcon';
import Link from '@components/common/Link';
import { Product } from '@components/types';
import { useCartItems } from '@context/CartProvider';
import formatMoney from '@lib/formatMoney';

import Button from '../common/Button';

import DeleteProduct from './DeleteProduct';

export interface SingleProductQuery {
  product: Product;
}

export const SINGLE_PRODUCT_QUERY = gql`
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = router.query;
  const { addToCart } = useCartItems();

  const { data, loading, error } = useQuery<SingleProductQuery>(
    SINGLE_PRODUCT_QUERY,
    {
      variables: { id },
    }
  );

  // TODO: add loader
  if (loading) return <p>Loading...</p>;

  // if (!id) router.replace('/404').catch(console.log);

  return (
    <>
      <ErrorMessage error={error!} />;
      <div className="py-20">
        <div className="grid grid-cols-1 gap-x-16 md:grid-cols-[0.75fr,1fr]">
          <div className="relative overflow-hidden border shadow-md rounded-2xl mb-8 md:mb-0">
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
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="text-5xl font-bold">{data?.product.name}</h1>
              <Menu as="div" className="flex relative">
                <Menu.Button className="p-4 rounded-full hover:bg-gray-200">
                  <BsThreeDots size={20} />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="z-40 absolute right-0 top-16 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          path={`/products/update?id=${data!.product.id}`}
                          title="Edit"
                          Icon={FaPencilAlt}
                          iconPosition="start"
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } flex text-2xl w-full items-center rounded-md px-6 py-4 hover:no-underline text-gray-700`}
                        />
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } flex items-center text-2xl w-full rounded-md px-6 py-4 hover:no-underline text-gray-700`}
                          onClick={() => setIsModalOpen(true)}
                        >
                          <AiFillDelete
                            size={20}
                            className="text-red-500 mr-4"
                          />
                          <span>Delete</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
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
                onClick={() =>
                  addToCart({ product: data!.product, quantity: 1 })
                }
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
      <DeleteProduct
        id={id as string}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductDetails;
