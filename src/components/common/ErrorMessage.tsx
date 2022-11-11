import React from 'react';

import { ServerError } from '@components/types';

const ErrorComponent = ({ error }: { error: string }) => (
  <div className="flex items-center justify-center">
    <div className="rounded-xl shadow-xl w-[500px] p-8 border-l-4 border-red-500">
      <p className="text-2xl font-semibold text-center">
        <span className="mr-2 text-red-500">Error:</span>
        {error}
      </p>
    </div>
  </div>
);

const ErrorMessage = ({ error }: { error: ServerError }) => {
  // console.log({ error });
  if (!error || !error.message) return null;

  if (error?.networkError?.result?.errors?.length) {
    return error.networkError.result.errors.map((err) => (
      <ErrorComponent
        key={err.locations[0].column}
        error={err.message.replace('GraphQL error: ', '')}
      />
    ));
  }

  return (
    <ErrorComponent error={error.message.replace('GraphQL error: ', '')} />
  );
};

export default ErrorMessage;
