import React, {
  createContext,
  ReactNode,
  useMemo,
  useState,
} from 'react';
import { ICartContextType, ICartItem, ProductProps } from '../../constants/dtos/common';

// create cart context
export const CartContext = createContext<ICartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
};

// create cart provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

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
  
  // increase the selected cart product quantity
  const increment = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  // decrese the selected cart product quantity
  const decrement = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };
  
  // deselect or remove product from cart
  const remove = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };
  
  // expose cart data and methods to app global context/state
  const memoizedValues = useMemo(() => ({
      cart,
      addToCart,
      increment,
      decrement,
      remove,
    }),
    [cart]
  );

  return <CartContext.Provider value={memoizedValues}>{children}</CartContext.Provider>;
};
