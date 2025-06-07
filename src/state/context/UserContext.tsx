import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { IUserContextType, IUserProps } from '../../../src/constants/dtos/common';


export const UserContext = createContext<IUserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUserProps | null>(null);

  const value = useMemo(() => ({
    user,
    setUser,
    isLoggedIn: user !== null,
  }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
