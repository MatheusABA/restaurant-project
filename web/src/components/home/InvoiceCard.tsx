import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import invoiceService from "../../api/invoiceService";

export default function InvoiceCard() {
  const { token } = useContext(AuthContext);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function fetchInvoices() {
      const invoices = await invoiceService.getAllInvoices(token);

      const sum = invoices.reduce((acc: number, inv: { total: number }) => acc + inv.total, 0);
      setTotal(sum);
    }
    fetchInvoices();
  }, [token]);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      padding: "1.5rem",
      minWidth: 220
    }}>
      <h4 style={{ margin: 0, fontSize: 18, color: "#2d3a4a" }}>Faturamento total</h4>
      <span style={{ fontSize: 32, fontWeight: 700, color: "#e67e22" }}>
        R$ {(total / 100).toFixed(2)}
      </span>
    </div>
  );
}