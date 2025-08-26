import { useEffect, useState, useContext } from "react";
import orderService from "../api/orderService";
import { AuthContext } from "../context/AuthContext";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from 'jspdf'

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

  function handleDownloadPDF(order: Order) {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text(`Fatura - Comanda #${order.id}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Mesa: ${order.table.number}`, 10, 30);
    doc.text(`Responsável: ${order.user.name}`, 10, 40);
    doc.text(`Valor total: R$ ${(order.totalValue! / 100).toFixed(2)}`, 10, 50);
    doc.text(`Finalizada em: ${new Date(order.updated_at).toLocaleString("pt-BR")}`, 10, 60);
    doc.text("Itens pedidos:", 10, 70);

    let y = 80;
    order.items.forEach(item => {
      doc.text(
        `${item.name} - R$ ${(item.price / 100).toFixed(2)} x ${item.quantity}`,
        10,
        y
      );
      y += 10;
    });

    doc.save(`fatura_comanda_${order.id}.pdf`);
  }

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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "23rem",
              }}
            >
              <h4 style={{ fontFamily: "Poppins", fontSize: 15 }}>
                Comanda #{order.id}
              </h4>
              <button
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#e74c3c",
                  fontSize: 22,
                  zIndex: 2,
                }}
                title="Baixar fatura em PDF"
                onClick={() => handleDownloadPDF(order)}
              >
                <FaFilePdf />
              </button>
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
              <div style={{
                fontFamily: "Poppins",
                fontSize: 12,
                color: "#888",
                marginTop: 'auto',
                alignSelf: 'flex-start'
              }}>
                Finalizada em: {new Date(order.updated_at).toLocaleString("pt-BR")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}