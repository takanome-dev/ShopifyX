import React, { createContext, useMemo, useState } from 'react';

import { InitialValues, UserInfo } from './types';

interface Props {
  children: React.ReactNode;
}

const initialState: InitialValues = {
  user: null,
  login: () => null,
};

const UserContext = createContext(initialState);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => {
    const handleLogin = (userInfo: UserInfo) => {
      console.log({ userInfo });
    };

    return {
      user,
      login: handleLogin,
    };
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
