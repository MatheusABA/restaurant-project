import { useContext, useState, useEffect } from "react";
import orderService from "../../api/orderService";
import { AuthContext } from "../../context/AuthContext";

function FinishedOrdersCard() {
  const { token } = useContext(AuthContext);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    orderService.getAllOrders(token).then((orders) => {
      const finalizados = orders.filter((o: { status: string }) => o.status === "completed");
      setTotal(finalizados.length);
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
      <h4 style={{ margin: 0, fontSize: 18, color: "#2d3a4a" }}>Pedidos finalizados</h4>
      <span style={{ fontSize: 32, fontWeight: 700, color: "#2ecc40" }}>{total}</span>
    </div>
  );
}

export default FinishedOrdersCard;