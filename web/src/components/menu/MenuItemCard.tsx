import React from "react";

interface MenuItemCardProps {
  item: {
    name: string;
    category: string;
    price: number;
    is_active: boolean;
  };
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: "1rem",
      minWidth: 220,
      marginBottom: 16,
      marginRight: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
      <h4 style={{ margin: 0, fontSize: 18, color: "#2d3a4a", fontFamily: 'Poppins' }}>{item.name}</h4>
      <div style={{ fontSize: 14, color: "#888", fontFamily: 'Poppins' }}>Categoria: {item.category}</div>
      <div style={{ fontSize: 16, fontFamily: 'Poppins' , color: "#3498db" }}>
        R$ {(item.price / 100).toFixed(2)}
      </div>
      <div style={{
        fontSize: 13,
        color: item.is_active ? "#2ecc40" : "#e74c3c",
        fontFamily: 'Poppins'
      }}>
        {item.is_active ? "Disponível" : "Indisponível"}
      </div>
    </div>
  );
};

export default MenuItemCard;