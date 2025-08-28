import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import menuService from "../../api/menuService";

export default function TotalProductsCard() {
  const { token } = useContext(AuthContext);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    menuService.getAllMenuItems(token).then((menuItem) => {
      const produtos = menuItem.filter((o: { is_active: boolean }) => o.is_active === true);
      setTotal(produtos.length);
    });
  }, [token]);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: "1.5rem",
      minWidth: 220
    }}>
      <h4 style={{ margin: 0, fontSize: 18, color: "#2d3a4a" }}>Produtos cadastrados</h4>
      <span style={{ fontSize: 32, fontWeight: 700, color: "#3498db" }}>{total}</span>
    </div>
  );
}