import { useContext } from "react";
import { ICartContextType } from "../constants/dtos/common";
import { CartContext } from "../context/CartContext";

export const useCart = (): ICartContextType => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('Oopps! useCart hook must be used within a CartProvider.');
    }
    return context;
  };