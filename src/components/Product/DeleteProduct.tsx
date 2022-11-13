/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import Button from '@components/common/Button';

interface Props {
  isOpen: boolean;
  loading: boolean;
  handleClose: () => void;
  handleDelete: () => Promise<void>;
}

const DeleteProduct = (props: Props) => {
  const { isOpen, loading, handleClose, handleDelete } = props;

  if (!isOpen) return null;

  return (
    <>
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
            className="border border-gray-400"
            onClick={handleClose}
          />
          <Button
            title="Delete"
            size="sm"
            className="text-red-500 border border-red-500 ml-8"
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
