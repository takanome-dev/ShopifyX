import { ApolloError } from '@apollo/client';

import { Product } from '@components/types';

export interface InitialValues {
  user: User | null;
  login: (user: UserInfo) => Promise<LoginReturnType> | null;
  register: (user: UserInfo) => Promise<RegisterReturnType> | null;
}

export interface LoginReturnType {
  loading: boolean;
  data: SigninMutationType | null | undefined;
}

export interface RegisterReturnType {
  loading: boolean;
  error: ApolloError | undefined;
}

export interface User {
  __typename?: string;
  id?: string;
  username: string;
  email: string;
  cart?: Cart[];
}

export interface UserQueryType {
  authenticatedItem: User;
}

export interface Cart {
  product: Product;
  quantity: number;
}

export interface UserInfo {
  username?: string;
  email: string;
  password: string;
}

export interface SigninMutationType {
  authenticateUserWithPassword: {
    __typename: string;
    message: string;
    sessionToken: string;
    item: {
      id: string;
      username: string;
      email: string;
    };
  };
}

export interface SignupMutationType {
  __typename?: string;
  username: string;
  email: string;
  password: string;
}
