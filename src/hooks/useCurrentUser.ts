import { gql, useQuery } from '@apollo/client';

import { UserQuery } from '@/interfaces/user';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        username
        email
        cart {
          quantity
          product {
            id
            name
            description
            stock
            price
            photo {
              id
              altText
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export default function useCurrentUser() {
  const { data, error, loading } = useQuery<UserQuery>(CURRENT_USER_QUERY);

  return { user: data?.authenticatedItem, error, loading };
}
