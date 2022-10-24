import { useMutation, useQuery } from '@apollo/client';
import React, { createContext, useContext, useMemo } from 'react';

import {
  AUTH_USER_MUTATION,
  CREATE_USER_MUTATION,
  CURRENT_USER_QUERY,
} from './auth';
import {
  InitialValues,
  UserInfo,
  SignupMutationType,
  SigninMutationType,
  UserQueryType,
} from './types';

interface Props {
  children: React.ReactNode;
}

const initialState: InitialValues = {
  user: null,
  login: () => null,
  register: () => null,
};

const UserContext = createContext(initialState);

export default function AuthProvider({ children }: Props) {
  const signInMutation = useMutation<SigninMutationType>(AUTH_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const signupMutation = useMutation<SignupMutationType>(CREATE_USER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const currentUserQuery = useQuery<UserQueryType>(CURRENT_USER_QUERY);
  // console.log({ currentUser: currentUserQuery?.data?.authenticatedItem });

  const login = async (user: UserInfo) => {
    const [signin, { loading, data }] = signInMutation;
    await signin({
      variables: {
        email: user.email,
        password: user.password,
      },
    });

    return { loading, data };
  };

  const register = async (user: UserInfo) => {
    const [signup, { loading, error }] = signupMutation;
    const [signin] = signInMutation;
    await Promise.all([
      await signup({
        variables: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      }),
      await signin({
        variables: {
          email: user.email,
          password: user.password,
        },
      }),
    ]);

    return { loading, error };
  };

  const value = useMemo(
    () => ({
      user: currentUserQuery?.data?.authenticatedItem || null,
      login,
      register,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUserQuery.data?.authenticatedItem]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const AuthContext = () => useContext(UserContext);
