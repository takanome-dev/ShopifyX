import { ApolloError } from '@apollo/client';

import { CartItem } from './cart';

export interface User {
  __typename?: string;
  id?: string;
  username: string;
  email: string;
  cart?: CartItem[];
  password?: string;
}

export interface UserQuery {
  authenticatedItem: User;
}

// export interface ILoginReturn {
//   loading: boolean;
//   data: LoginMutation | null | undefined;
// }

export interface IRegisterReturn {
  createUser: RegisterMutation;
}

export interface LoginMutation {
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

export interface RegisterMutation {
  __typename?: string;
  username: string;
  email: string;
  password: string;
}
