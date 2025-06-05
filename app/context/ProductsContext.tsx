import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { products as initialProducts } from '../constants/data/products';
import { IProductsContextType, ProductProps } from '../constants/dtos/common';


export const ProductsContext = createContext<IProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductProps[]>(initialProducts);

  const value = useMemo(() => ({
      products,
      setProducts,
    }),
    [products]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};