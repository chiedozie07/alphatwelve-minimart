import { FavoritesContext, FavoritesContextType } from "@/state/context/FavoritesContext";
import { useContext } from "react";

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if(!context) throw new Error('Error: useFavorites hook must be used within a FavoritesContextProvider');
    return context;
};