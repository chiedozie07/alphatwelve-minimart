import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { CartContextType, CartItem, ProductProps } from '../constants/dtos/common';

// create cart context
export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
};

// create cart provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: ProductProps) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const increment = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const remove = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const value = useMemo(() => ({
      cart,
      addToCart,
      increment,
      decrement,
      remove,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
