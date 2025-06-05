import { useContext } from "react";
import { IUserContextType } from "../constants/dtos/common";
import { UserContext } from "../state/context/UserContext";

export const useUser = (): IUserContextType => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('Oopps! useUser hook must be used within a UserProvider.');
    }
    return context;
  };