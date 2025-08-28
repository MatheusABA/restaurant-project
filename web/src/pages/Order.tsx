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
  menu_item_id: number;
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

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const fetchTables = async () => {
    const allTables = await orderService.getAllTables(token);
    setTables(allTables.filter((t: { status: string; }) => t.status === "disponivel"));
  };

  const handleCreateOrder = async () => {
    if (!selectedTableId) return;
    await orderService.createOrder(token, selectedTableId, []);
    setShowCreateModal(false);
    refreshOrders();
  };

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

  const openOrders = orders.filter((order) => order.status === "open");

  return (
    <div style={{ padding: "2rem" }}>
      <h2
        style={{
          fontFamily: "Poppins",
          fontSize: 24,
        }}
      >
        Mesas ocupadas
      </h2>
      <button
        style={{
          background: "#3498db",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: 4,
          fontFamily: "Poppins",
          fontSize: 16,
          marginBottom: 20,
        }}
        onClick={() => {
          fetchTables();
          setShowCreateModal(true);
        }}
      >
        Criar comanda
      </button>
      {loading ? (
        <div
          style={{
            fontFamily: "Poppins",
            fontSize: 18,
          }}
        >
          Carregando...
        </div>
      ) : openOrders.length === 0 ? (
        <div
          style={{
            fontFamily: "Poppins",
            fontSize: 18,
            color: "#888",
          }}
        >
          Nenhuma comanda encontrada.
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {openOrders.map((order) => (
            <OrderCard key={order.id} order={order} onRefresh={refreshOrders} />
          ))}
        </div>
      )}
      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 300,
            }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: 18,
                marginBottom: 16,
              }}
            >
              Selecionar mesa
            </h3>
            <select
              style={{ width: "100%", padding: 8, marginBottom: 16, fontFamily: 'Poppins'}}
              value={selectedTableId !== null ? String(selectedTableId) : ""}
              onChange={e => setSelectedTableId(Number(e.target.value))}
            >
              <option value="">Selecione uma mesa</option>
              {tables?.map((table) => (
                <option key={table.id} value={String(table.id)}>
                  Mesa {table.number}
                </option>
              ))}
            </select>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleCreateOrder}
                style={{
                  background: "#2ecc40",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "Poppins",
                  fontSize: 14,
                }}
                disabled={!selectedTableId}
              >
                Criar
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "Poppins",
                  fontSize: 14,
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}