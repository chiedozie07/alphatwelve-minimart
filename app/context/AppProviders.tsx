import React, { ReactNode } from 'react';
import { CartProvider } from './CartContext';
import { ProductsProvider } from './ProductsContext';
import { UserProvider } from './UserContext';

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>{children}</CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
};
