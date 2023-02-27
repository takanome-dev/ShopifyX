import { gql } from '@apollo/client';

export const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

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
        sessionToken
        __typename
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

export const VALIDATE_TOKEN_QUERY = gql`
  query VALIDATE_TOKEN_QUERY($email: String!, $token: String!) {
    validateUserPasswordResetToken(email: $email, token: $token) {
      code
      message
      __typename
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;
