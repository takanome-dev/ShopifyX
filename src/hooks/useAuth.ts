import { useMutation, gql } from '@apollo/client';

import { LoginMutation, RegisterMutation } from '@interfaces/user';

import { CURRENT_USER_QUERY } from './useCurrentUser';

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

export default function useAuth() {
  const [login, { loading: loginLoading }] = useMutation<LoginMutation>(
    AUTH_USER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const [register, { loading: registerLoading }] =
    useMutation<RegisterMutation>(CREATE_USER_MUTATION, {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

  // const logout = async () => {
  //   await client.resetStore();
  // };

  const auth = {
    login,
    register,
    loginLoading,
    registerLoading,
    // loginError,
    // loginData,
    // registerError,
    // registerData,
  };

  return auth;
}
