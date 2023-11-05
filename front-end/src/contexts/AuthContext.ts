import React from "react";
import User from "../entities/User";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
}

const AuthContext =
  React.createContext<AuthContextType>(
    {} as AuthContextType
  );

export default AuthContext;
