import { useMutation } from '@apollo/client';

import {
  AUTH_USER_MUTATION,
  CREATE_USER_MUTATION,
  CURRENT_USER_QUERY,
} from '@/gql/user';
import { LoginMutation, RegisterMutation } from '@/interfaces/user';

export default function useAuth() {
  const [login, { loading: loginLoading }] = useMutation<LoginMutation>(
    AUTH_USER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const [register, { loading: registerLoading, error: registerError }] =
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
    registerError,
    // registerData,
  };

  return auth;
}
