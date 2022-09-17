import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

const ErrorMessage = ({ error }: { error: string | false | undefined }) => {
  if (!error) return null;

  return (
    <div className="flex items-center mt-2 text-2xl text-red">
      <MdErrorOutline className="mr-4" size={20} />
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
