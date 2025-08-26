import React, { useContext, useState } from "react";
import orderService from "../../api/orderService";
import { AuthContext } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa"; // Instale react-icons se não tiver

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

interface Props {
  order: Order;
  onRefresh?: () => void;
}

const OrderStatus = {
  OPEN: "Aberta",
  COMPLETED: "Fechada",
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "open":
      return OrderStatus.OPEN;
    case "completed":
      return OrderStatus.COMPLETED;
    default:
      return status;
  }
};

const OrderCard: React.FC<Props> = ({ order, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const handleCloseOrder = async () => {
    if (!order.items) {
      window.alert("A comanda está vazia, adicione items para poder fechâ-la!");
      return;
    }
    if (!window.confirm("Deseja realmente fechar esta comanda?")) return;
    setLoading(true);
    try {
      await orderService.closeOrder(token, order.id);
      alert("Comanda fechada com sucesso!");
      if (onRefresh) onRefresh();
    } catch {
      alert("Erro ao fechar comanda.");
    }
    setLoading(false);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const priceInCents = Math.round(Number(itemPrice) * 100);
      await orderService.addOrderItem(token, order.id, {
        name: itemName,
        price: priceInCents,
        quantity: itemQuantity,
      });
      alert("Item adicionado!");
      setShowModal(false);
      setItemName("");
      setItemPrice(0);
      setItemQuantity(1);
      if (onRefresh) onRefresh();
    } catch {
      alert("Erro ao adicionar item.");
    }
    setLoading(false);
  };

  const handleDiscardOrder = async () => {
    if (!window.confirm("Deseja descartar esta comanda?")) return;
    setLoading(true);
    try {
      await orderService.discardOrder(token, order.id);
      alert("Comanda descartada!");
      if (onRefresh) onRefresh();
    } catch {
      alert("Erro ao descartar comanda.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "1rem",
        minWidth: "250px",
        background: "#fafbfc",
        position: "relative",
      }}
    >
      {order.status === "open" && (
        <button
          onClick={handleDiscardOrder}
          disabled={loading}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#de4b40",
            fontSize: 20,
            zIndex: 2,
          }}
          title="Descartar comanda"
        >
          <FaTrash />
        </button>
      )}

      <h4 style={{ fontFamily: "Poppins", fontSize: 15 }}>
        Mesa {order.table?.number ?? ""}
      </h4>
      <div>
        <b style={{ fontFamily: "Poppins", fontSize: 12 }}>Responsável:</b>{" "}
        {order.user.name}
      </div>
      <div>
        <b style={{ fontFamily: "Poppins", fontSize: 12 }}>Status:</b>{" "}
        {getStatusLabel(order.status)}
      </div>
      <div>
        <b style={{ fontFamily: "Poppins", fontSize: 12 }}>Itens:</b>
      </div>
      <ul>
        {order.items?.map((item) => (
          <li key={item.id} style={{ fontFamily: "Poppins", fontSize: 14 }}>
            {item.name} - R$ {(item.price / 100).toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <div style={{ fontFamily: "Poppins", fontSize: 12, color: "#888" }}>
        Criada em: {new Date(order.created_at).toLocaleString("pt-BR")}
      </div>
      {order.status === "open" && (
        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button
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
            onClick={handleCloseOrder}
            disabled={loading}
          >
            Fechar comanda
          </button>
          <button
            style={{
              background: "#3498db",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontSize: 14,
            }}
            onClick={() => setShowModal(true)}
            disabled={loading}
          >
            Adicionar item
          </button>
          {/* <button
            style={{
              background: "#e67e22",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontSize: 14
            }}
            onClick={handleDiscardOrder}
            disabled={loading}
          >
            Descartar comanda
          </button> */}
        </div>
      )}
      {showModal && (
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
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: 18,
                marginBottom: 16,
              }}
            >
              Adicionar item
            </h3>
            <form onSubmit={handleAddItem}>
              <div style={{ marginBottom: 12 }}>
                <label
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 12,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Nome do item
                </label>
                <input
                  type="text"
                  placeholder="Ex: Peixe"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                  style={{
                    width: "80%",
                    padding: 8,
                    marginBottom: 8,
                    fontFamily: "Poppins",
                    fontSize: 12,
                  }}
                />
                <label
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 12,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Preço
                </label>
                <input
                  type="number"
                  step="0.10"
                  placeholder="Ex: 12"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                  required
                  style={{
                    width: "80%",
                    padding: 8,
                    marginBottom: 8,
                  }}
                />
                <label
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 12,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Quantidade
                </label>
                <input
                  type="number"
                  placeholder="Ex: 1"
                  value={itemQuantity}
                  min={1}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                  required
                  style={{ width: "80%", padding: 8 }}
                />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="submit"
                  disabled={loading}
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
                >
                  Inserir
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;