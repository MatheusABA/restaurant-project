import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import OpenOrdersCard from "../components/home/OpenOrdersCard";
import FinishedOrdersCard from "../components/home/FinishedOrdersCard";
import InvoiceCard from "../components/home/InvoiceCard";
import TotalProductsCard from "../components/home/TotalProductsCard";

export default function Home() {

  const { user } = useContext(AuthContext)

  return (


    <div style={{ display: "flex", fontFamily: "Poppins" }}>
      <main style={{ flex: 1, paddingLeft: "2rem" }}>
      <h2 style={{ color: "#2d3a4a" }}>Bem-vindo {user?.name}!</h2>
        <div style={{ width:  "95%" }}>
          <InvoiceCard/>
        </div>
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <OpenOrdersCard />
          <FinishedOrdersCard />
          <TotalProductsCard />
        </div>
      </main>
    </div>
  );
}