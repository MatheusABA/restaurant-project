import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import AuthService from "../api/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import userService from "../api/userService";

type DecodedToken = {
  exp: number;
  role?: string;
  user_id?: number;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
  const [user, setUser] = useState<{ id: number; name: string; email: string; role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      AuthService.validateToken(token)
        .then((valid) => {
          if (!valid) {
            setToken("");
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          try {
            const decodedToken = jwtDecode(token) as DecodedToken;
            const now = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < now) {
              setToken("");
              localStorage.removeItem("token");
              navigate("/login");
              return;
            }
            if (decodedToken.role !== "admin") {
              setToken("");
              localStorage.removeItem("token");
              navigate("/login");
            } 
            if (decodedToken.user_id) {
              userService.getUserById(token, decodedToken.user_id)
                .then(setUser)
                .catch(() => setUser(null))
            }
          } catch {
            setToken("");
            localStorage.removeItem("token");
            navigate("/login");
          }
        })
        .catch(() => {
          setToken("");
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = (newToken: string) => setToken(newToken);
  const logout = () => {
    setToken("");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}