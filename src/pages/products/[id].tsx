import { useQuery } from '@apollo/client';
import { Menu, Transition } from '@headlessui/react';
import {
  Edit3,
  ShoppingBag,
  DollarSign,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import DeleteProduct from '@/components/delete-product';
import Favorite from '@/components/favorite';
import { useCartItems } from '@/context/CartProvider';
import { SINGLE_PRODUCT_QUERY } from '@/gql/product';
import { SingleProductQuery } from '@/interfaces/product';
import formatMoney from '@/utils/formatMoney';

export default function SingleProductPage() {
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
  // console.log({ data });

  // if (!id) router.replace('/404').catch(console.log);

  return (
    <>
      <ErrorMessage error={error!} />;
      <div className="product-detail py-20">
        <div className="grid grid-cols-1 gap-x-16 md:grid-cols-[0.75fr,1fr]">
          <div className="relative overflow-hidden border shadow-md rounded-2xl mb-8 md:mb-0">
            <Image
              src={data?.product.photo.image.publicUrlTransformed as string}
              alt={data?.product.name as string}
              width={400}
              height={350}
              className="product-image object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
            />
            <Favorite className="top-8 right-8" />
          </div>
          <div>
            <div className="flex justify-between mb-8">
              <h1 className="product-title text-5xl font-bold">
                {data?.product.name}
              </h1>
              <Menu as="div" className="product-options flex relative">
                <Menu.Button className="p-4 rounded-full hover:bg-gray-200">
                  <MoreHorizontal size={20} />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items className="product-dropdown z-40 absolute right-0 top-16 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`/products/update?id=${data!.product.id}`}
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } flex text-2xl w-full items-center rounded-md px-6 py-4 hover:no-underline text-gray-700 edit-product`}
                        >
                          <Edit3 />
                          Edit
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`${
                            active ? 'bg-gray-100' : 'bg-white'
                          } flex items-center text-2xl w-full rounded-md px-6 py-4 hover:no-underline text-gray-700 delete-product`}
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Trash2 size={20} className="text-red-500 mr-4" />
                          <span>Delete</span>
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <p className="product-price mb-8 text-3xl font-semibold">
              {formatMoney(data?.product.price)}
            </p>
            {data?.product.stock ? (
              <p className="product-stock mb-8 text-2xl font-medium">
                Stock: {data?.product.stock}
              </p>
            ) : null}
            <div className="">
              <p className="product-desc-title text-2xl text-gray-400">
                Description:
              </p>
              <p className="product-desc mt-4 text-2xl">
                {data?.product.description}
              </p>
            </div>
            <div className="product-buttons mt-12 flex">
              <Button
                title="Buy now"
                className="text-3xl"
                variant="primary"
                Icon={DollarSign}
                iconPosition="start"
                size="md"
              />
              <Button
                title="Add to cart"
                className="ml-8 text-3xl border-2"
                variant="secondary"
                Icon={ShoppingBag}
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
}
