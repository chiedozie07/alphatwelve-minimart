import { ProductProps } from "@/constants/dtos/common";
import React, { createContext, useMemo, useState } from "react";

export type FavoriteItem = ProductProps;

export type FavoritesContextType = {
  favorites: FavoriteItem[];
  addFavorites: (product: FavoriteItem) => void;
  removeFavorite: (id: string) => void;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
};

//create fav context
export const FavoritesContext = createContext<FavoritesContextType | null>(null);

//create fav context provider
export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorites = (product: FavoriteItem) => {
    setFavorites(prevItems => {
      // avoid duplicate/spanning
      if (prevItems.some(item => item.id === product.id)) return prevItems;
      return [...prevItems, product];
    })
  };

  // remove favorite
  const removeFavorite = (id: string) => setFavorites((prev) => prev.filter((item) => item.id !== id));

  const memoizedValues = useMemo(() => ({
    favorites,
    addFavorites,
    removeFavorite
  }), [favorites]);

  return <FavoritesContext.Provider value={memoizedValues}>{children}</FavoritesContext.Provider>
};
