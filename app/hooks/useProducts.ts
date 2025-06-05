import { useContext } from "react";
import { IProductsContextType } from "../constants/dtos/common";
import { ProductsContext } from "../state/context/ProductsContext";

export const useProducts = (): IProductsContextType => {
    const context = useContext(ProductsContext);
    if (!context) {
      throw new Error('Opps! An Error occured, useProducts hook must be used within a ProductsProvider.');
    }
    return context;
  };  