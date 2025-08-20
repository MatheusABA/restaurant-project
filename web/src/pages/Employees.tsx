import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import userService from "../api/userService";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

const UserRole = {
  User: "user",
  Admin: "admin",
} as const;
type UserRole = typeof UserRole[keyof typeof UserRole];

function getRoleLabel(role: UserRole) {
  switch (role) {
    case UserRole.Admin:
      return "Gestor";
    case UserRole.User:
      return "Funcionário";
    default:
      return "Desconhecido";
  }
}

export default function Employees() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAllUsers(token)
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem", fontFamily: "Poppins" }}>Funcionários</h2>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <thead>
            <tr style={{ background: "#2d3a4a", color: "#fff" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>ID</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>Nome</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>E-mail</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>Cargo</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ padding: "0.5rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13, textAlign: 'center' }}>
                  {u.id}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>{u.name}</td>
                <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>{u.email}</td>
                <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>
                  {getRoleLabel(u.role)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}