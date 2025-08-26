import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {

  const { user } = useContext(AuthContext)

  return (


    <div style={{ display: "flex", fontFamily: "Poppins" }}>
      <main style={{ flex: 1, paddingLeft: "2rem" }}>
        <h2 style={{ color: "#2d3a4a" }}>Bem-vindo {user?.name}!</h2>
      </main>
    </div>
  );
}