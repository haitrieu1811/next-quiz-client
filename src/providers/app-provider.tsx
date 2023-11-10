"use client";

import PropTypes from "prop-types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { getAccessTokenFromLS, getUserFromLS } from "@/lib/auth";
import { UserType } from "@/types/user.types";

type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
};

const initialContext: AppContextType = {
  isAuthenticated: !!getAccessTokenFromLS(),
  setIsAuthenticated: () => null,
  user: getUserFromLS(),
  setUser: () => null,
};

export const AppContext = createContext<AppContextType>(initialContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialContext.isAuthenticated
  );
  const [user, setUser] = useState<UserType | null>(initialContext.user);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
