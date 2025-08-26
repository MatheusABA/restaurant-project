import { createContext } from "react";

export interface AuthContextType {
  token: string;
  user: {
    id: number,
    name: string;
    email: string,
    role: string,
  } | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  user: null,
  login: () => {},
  logout: () => {},
});