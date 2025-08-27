import React, { useState, useContext } from "react";
import menuService from "../api/menuService";
import { AuthContext } from "../context/AuthContext";

export default function Menu() {
  const { token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await menuService.createMenuItem(token, {
        name: form.name,
        price: Number(form.price) * 100,
        category: form.category,
        is_active: true,
      });
      alert("Produto criado com sucesso!");
      setShowModal(false);
      setForm({ name: "", price: "", category: "", is_active: true });
    } catch {
      alert("Erro ao criar produto.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", margin: '2rem' }}>
      <button
        style={{
          background: "#3498db",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: 8,
          fontFamily: "Poppins",
          fontSize: 18,
          cursor: "pointer",
          marginBottom: 24
        }}
        onClick={() => setShowModal(true)}
      >
        Adicionar produto
      </button>
      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999
        }}>
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#fff", padding: 32, borderRadius: 12, minWidth: 320, boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
            }}
          >
            <h3 style={{ fontFamily: "Poppins", fontSize: 20, marginBottom: 20 }}>Novo produto</h3>
            <div style={{ marginBottom: 16 }}>
              <label>Nome:</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Preço:</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Categoria:</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
              />
            </div>
            {/* <div style={{ marginBottom: 16 }}>
              <label>
                <input
                  name="is_active"
                  type="checkbox"
                  checked={form.is_active}
                  onChange={e => setForm({ ...form, is_active: e.target.checked })}
                  style={{ marginRight: 8 }}
                />
                Ativo
              </label>
            </div> */}
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#2ecc40",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 4,
                  fontFamily: "Poppins",
                  fontSize: 16,
                  cursor: "pointer"
                }}
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 4,
                  fontFamily: "Poppins",
                  fontSize: 16,
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}