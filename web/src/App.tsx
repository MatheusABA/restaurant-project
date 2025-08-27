import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext, type JSX } from "react";
import { AuthProvider } from "./context/AuthProvider";
import Employees from "./pages/Employees";
import ProtectedLayout from "./components/ui/ProtectedLayout";
import OrderPage from "./pages/Order";
import Dashboard from "./pages/Dashboard";
import Delivery from "./pages/Delivery";
import Menu from "./pages/Menu";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useContext(AuthContext);
  return token ? <ProtectedLayout>{children}</ProtectedLayout> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />

        <Route
            path="/menu"
            element={
              <PrivateRoute>
                <Menu />
              </PrivateRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/delivery"
            element={
              <PrivateRoute>
                <Delivery />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}