import { ApolloError } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { ServerError } from '@interfaces/graphql';

const ErrorComponent = ({
  error,
  handleClose,
}: {
  error: string | null;
  handleClose: () => void;
}) => (
  <div className="absolute transition duration-300 ease-in-out top-28 left-1/2 -translate-x-1/2 z-10 rounded-xl shadow-md w-[500px] border-l-4 border-t-2 border-red-500">
    <div className="relative p-4 mr-10">
      <p className="text-2xl font-semibold text-center">
        <span className="mr-2 text-red-500">Error:</span>
        {error}
      </p>
    </div>
    <button
      type="button"
      className="absolute top-2 right-3 p-2 rounded-full hover:bg-gray-100"
      onClick={handleClose}
    >
      <AiOutlineClose size={16} />
    </button>
  </div>
);

const ErrorMessage = ({ error }: { error: ApolloError | ServerError }) => {
  const [errMessage, setErrMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error && error.message) {
      setErrMessage(error.message.replace('GraphQL error: ', ''));
    }
  }, [error]);

  if (!errMessage) return null;

  const handleClose = () => setErrMessage(null);

  if ((error as ServerError)?.networkError?.result?.errors?.length) {
    return (
      <ErrorComponent
        error={(
          error as ServerError
        ).networkError.result.errors[0].message.replace('GraphQL error: ', '')}
        handleClose={handleClose}
      />
    );
  }

  return <ErrorComponent error={errMessage} handleClose={handleClose} />;
};

export default ErrorMessage;
