import { gql, useQuery } from '@apollo/client';

interface UserType {
  authenticatedItem: {
    id: string;
    username: string;
    email: string;
  };
}

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        username
        email
        # TODO: query cart
      }
    }
  }
`;

export function useCurrentUser() {
  const { data } = useQuery<UserType>(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}
