import { useContext, useEffect, useState } from "react";
import orderService from "../api/orderService";
import OrderCard from "../components/orders/OrderCard";
import { AuthContext } from "../context/AuthContext";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface OrderItem {
  id: number;
  order_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Table {
  id: number;
  number: number;
  status: string;
}

interface Order {
  id: number;
  user_id: number;
  user: User;
  table_id: number;
  table: Table;
  status: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}


export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const refreshOrders = () => {
    setLoading(true);
    orderService.getAllOrders(token)
      .then(setOrders)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    orderService.getAllOrders(token)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [token]);

  const openOrders = orders.filter(order => order.status === 'open');

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{
        fontFamily: 'Poppins',
        fontSize: 24
        }}
      >Mesas ocupadas</h2>
      {loading ? (
        <div style={{
          fontFamily: 'Poppins',
          fontSize: 18
        }}>Carregando...</div>
      ) : openOrders.length === 0 ? (
        <div style={{
          fontFamily: 'Poppins',
          fontSize: 18,
          color: '#888',
        }}>Nenhuma comanda encontrada.</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {openOrders.map(order => (
            <OrderCard key={order.id} order={order} onRefresh={refreshOrders} />
          ))}
        </div>
      )}
    </div>
  );
}