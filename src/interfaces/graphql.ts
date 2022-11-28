export interface ServerError {
  graphQLErrors: [];
  clientErrors: [];
  networkError: {
    name: string;
    response: unknown;
    statusCode: number;
    result: {
      errors: [
        {
          message: string;
          locations: { line: number; column: number }[];
          extensions: {
            code: string;
            exception: {
              stacktrace: [];
            };
          };
        }
      ];
    };
  };
  message: string;
}
