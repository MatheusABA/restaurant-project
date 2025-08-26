import { useEffect, useState, useContext } from "react";
import orderService from "../api/orderService";
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
  totalValue?: number
}

export default function Dashboard() {
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchOrders() {
      const allOrders = await orderService.getAllOrders(token);
      console.log(JSON.stringify(allOrders, null, 2));
      const filtered = allOrders
        .filter((order: { status: string; })  => order.status === "completed")
        .map((order: { items: never[]; }) => ({
          ...order,
          totalValue: order.items.reduce(
            (sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity,
            0
          ),
        }));
      setCompletedOrders(filtered);
      setLoading(false);
    }
    fetchOrders();
  }, [token]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontFamily: "Poppins", fontSize: 24 }}>
        Pedidos finalizados
      </h2>
      {loading ? (
        <div style={{ fontFamily: "Poppins", fontSize: 18 }}>Carregando...</div>
      ) : completedOrders.length === 0 ? (
        <div style={{
          fontFamily: "Poppins",
          fontSize: 18,
          color: "#888",
        }}>Nenhuma comanda finalizada encontrada.</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {completedOrders.map(order => (
            <div
              key={order.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "1rem",
                minWidth: "250px",
                background: "#f6f6f6",
                position: "relative",
              }}
            >
              <h4 style={{ fontFamily: "Poppins", fontSize: 15 }}>
                Comanda #{order.id}
              </h4>
              <div>
                <b style={{ fontFamily: "Poppins", fontSize: 12}}>
                  Mesa:
                </b>{" "}
                {order.table.number}
              </div>
              <div>
                <b style={{ fontFamily: "Poppins", fontSize: 12 }}>
                  Responsável:
                </b>{" "}
                {order.user.name}
              </div>
              <div>
                <b style={{ fontFamily: "Poppins", fontSize: 12 }}>
                  Valor total:
                </b>{" "}
                R$ {((typeof order.totalValue === "number" ? order.totalValue : 0) / 100).toFixed(2)}
              </div>
              <div>
                <b style={{ fontFamily: "Poppins", fontSize: 12 }}>
                  Itens:
                </b>
              </div>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} style={{ fontFamily: "Poppins", fontSize: 14 }}>
                    {item.name} - R$ {(item.price / 100).toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
              <div style={{ fontFamily: "Poppins", fontSize: 12, color: "#888" }}>
                Finalizada em: {new Date(order.updated_at).toLocaleString("pt-BR")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}