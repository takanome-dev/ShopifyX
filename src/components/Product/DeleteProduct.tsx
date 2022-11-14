/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '@components/common/Button';
import ErrorMessage from '@components/common/ErrorMessage';

interface DeleteProductMutation {
  deleteProduct: {
    __typename: string;
    id: string;
  };
}

interface Props {
  id: string;
  isOpen: boolean;
  handleClose: () => void;
}

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      __typename
      id
    }
  }
`;

const DeleteProduct = (props: Props) => {
  const { id, isOpen, handleClose } = props;

  const router = useRouter();

  const [deleteProduct, { loading, error }] =
    useMutation<DeleteProductMutation>(DELETE_PRODUCT_MUTATION, {
      update: (cache, payload) =>
        // @ts-ignore
        cache.evict(cache.identify(payload.data!.deleteProduct)),
    });

  if (!isOpen || !id) return null;

  const handleDelete = async () => {
    await deleteProduct({
      variables: {
        id,
      },
    });

    if (!error) {
      router.replace('/products').catch(console.log);
    }
  };

  return (
    <>
      <ErrorMessage error={error!} />;
      <div
        className="fixed inset-0 z-10 transition ease-in-out bg-gray-900 bg-opacity-40"
        onClick={handleClose}
      />
      <div className="bg-white rounded-xl z-10 p-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-2xl">Do you really want to delete this product?</p>
        <div className="flex mt-8 justify-center">
          <Button
            title="Cancel"
            size="sm"
            className="border border-gray-400 hover:bg-gray-100"
            onClick={handleClose}
          />
          <Button
            title="Delete"
            size="sm"
            className="text-red-500 border border-red-500 hover:bg-red-100 ml-8"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleDelete}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
