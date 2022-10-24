import { gql } from '@apollo/client';

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

export const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      __typename
      id
      username
      email
    }
  }
`;

export const AUTH_USER_MUTATION = gql`
  mutation AUTH_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          username
          email
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        __typename
        message
      }
    }
  }
`;
