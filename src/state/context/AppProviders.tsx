import React, { ReactNode } from 'react';
import { AlertProvider } from './AlertContext';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { ProductsProvider } from './ProductsContext';
import { UserProvider } from './UserContext';

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AlertProvider>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
            </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </AlertProvider>
  );
};
