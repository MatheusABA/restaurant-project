import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import userService from "../api/userService";
import axios from "axios";
import EmployeeFilter from "../components/employees/EmployeeFilter";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  deleted_at?: string | null;
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

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: UserRole }>
    ({
      name: "",
      email: "",
      password: "",
      role: UserRole.User 
    });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);

  
  // Filter states
  const [filterRoleEdit, setFilterRoleEdit] = useState<string>("all");
  const [filterIdEdit, setFilterIdEdit] = useState<string>("");

  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterId, setFilterId] = useState<string>("");

  // Soft deleted users states
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (showArchived) {
      userService.getArchivedUsers(token)
        .then(setUsers)
        .catch(() => setUsers([]))
        .finally(() => setLoading(false));
    } else {
      userService.getAllUsers(token)
        .then(setUsers)
        .catch(() => setUsers([]))
        .finally(() => setLoading(false));
    }
  }, [token, showArchived]);

  // Função para abrir modal de criação
  function openModal() {
    setForm({ name: "", email: "", password: "", role: UserRole.User });
    setFormError("");
    setShowModal(true);
  }

  // Função para abrir modal de edição
  function openEditModal(user: User) {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditMode(true);
    setEditUserId(user.id);
    setFormError("");
    setShowModal(true);
  }

  // Função para criar usuário
  async function handleCreateOrUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");
    try {
      if (editMode && editUserId) {
        // Atualiza usuário
        await userService.updateUser(token, editUserId, {
          name: form.name,
          email: form.email,
          password: form.password ? form.password : '',
          role: form.role,
        });
      } else {
        // Cria usuário
        await userService.createUser(token, {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
      }
      setShowModal(false);
      setFormLoading(false);
      setEditMode(false);
      setEditUserId(null);
      // Atualiza lista
      setLoading(true);
      userService.getAllUsers(token)
        .then(setUsers)
        .catch(() => setUsers([]))
        .finally(() => setLoading(false));
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setFormError(err.response.data.error);
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("Erro ao salvar usuário");
      }
      setFormLoading(false);
    }
  }

  async function handleDeleteUser(id: number) {
    if (!window.confirm("Tem certeza que deseja remover este funcionário?")) return;
    setLoading(true);
    try {
      await userService.deleteUser(token, id);
      userService.getAllUsers(token)
        .then(setUsers)
        .catch(() => setUsers([]))
        .finally(() => setLoading(false));
      window.alert("Funcionário removido com sucesso.");
    } catch {
      setLoading(false);
      alert("Erro ao remover funcionário.");
    }
  }

  async function handleActivateUser(id: number) {
    setLoading(true);
    try {
      await userService.activateUser(token, id);
      userService.getArchivedUsers(token)
        .then(setUsers)
        .catch(() => setUsers([]))
        .finally(() => setLoading(false));
      window.alert("Funcionário ativado com sucesso.");
    } catch {
      setLoading(false);
      alert("Erro ao ativar funcionário.");
    }
  }

  const handleApplyFilters = () => {
    setFilterRole(filterRoleEdit);
    setFilterId(filterIdEdit);
  };

  const handleClearFilters = () => {
    setFilterRoleEdit("all");
    setFilterIdEdit("");
    setFilterRole("all");
    setFilterId("");
  };

  const filteredUsers = users.filter(u => {
    const roleMatch = filterRole === "all" || u.role === filterRole;
    const idMatch = filterId === "" || u.id.toString() === filterId;
    return roleMatch && idMatch;
  });



  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1.5rem", fontFamily: "Poppins" }}>Funcionários registrados</h2>
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem" }}>
        <button
          style={{
            background: "#2d3a4a",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: 600,
            fontFamily: "Poppins",
            cursor: "pointer",
          }}
          onClick={() => {
            setEditMode(false);
            setEditUserId(null);
            openModal();
          }}
        >
          Adicionar Usuário
        </button>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <EmployeeFilter
          filterRole={filterRole}
          setFilterRole={setFilterRole}
          filterId={filterId}
          setFilterId={setFilterId}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          UserRole={UserRole}
        />
        <button
          style={{
            background: showArchived ? "#18b862" : "#2d3a4a",
            color: "#fff",
            padding: "0.5rem 1.5rem",
            marginBottom: "1.5rem",
            borderRadius: "8px",
            border: "none",
            fontFamily: "Poppins",
            cursor: "pointer",
            fontWeight: 600,
            boxShadow: showArchived ? "0 2px 8px rgba(24,184,98,0.15)" : undefined,
            marginLeft: "1rem"
          }}
          onClick={() => setShowArchived(!showArchived)}
          title={showArchived ? "Mostrar ativos" : "Mostrar arquivados"}
        >
          {showArchived ? "Ativos" : "Arquivados"}
        </button>
      </div>
      {loading ? (
        <div>
          <p style={{ fontFamily: 'Poppins' }}>Carregando...</p>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
          <thead>
            <tr style={{ background: "#2d3a4a", color: "#fff" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>ID</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>Nome</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>E-mail</th>
              <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>Cargo</th>
              <th style={{ padding: "0.5rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14, width: '100px' }}>Ações</th>
              {showArchived && (
                <th style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 14 }}>
                  Deletado em
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{
                  textAlign: "center",
                  padding: "5rem",
                  color: "#888",
                  fontFamily: "Poppins",
                  fontSize: 16,
                }}>
                  {showArchived
                    ? "Nenhum funcionário arquivado encontrado."
                    : "Nenhum funcionário ativo encontrado."}
                </td>
              </tr>
            ) : (
              filteredUsers.map(u => (
                <tr key={u.id}>
                  <td style={{ padding: "0.5rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13, textAlign: 'center' }}>
                    {u.id}
                  </td>
                  <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>{u.name}</td>
                  <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>{u.email}</td>
                  <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>
                    {getRoleLabel(u.role)}
                  </td>
                  <td
                    style={{ 
                      border: "1px solid #eee",
                      fontFamily: "Poppins",
                      fontSize: 13,
                      display: "flex",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!showArchived ? (
                      <>
                        <button
                          style={{
                            background: "#e0e7ef",
                            color: "#2d3a4a",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            border: "none",
                            fontFamily: "Poppins",
                            cursor: "pointer",
                          }}
                          onClick={() => openEditModal(u)}
                        >
                          Editar
                        </button>
                        <button
                          style={{
                            background: "#d1364e",
                            color: "#fff",
                            padding: "0.5rem 1rem",
                            borderRadius: "8px",
                            border: "none",
                            fontFamily: "Poppins",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          Remover
                        </button>
                      </>
                    ) : (
                      <button
                        style={{
                          background: "#18b862",
                          color: "#fff",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          border: "none",
                          fontFamily: "Poppins",
                          cursor: "pointer",
                        }}
                        // Falta implementar ainda
                        onClick={() => handleActivateUser(u.id)}
                      >
                        Reativar
                      </button>
                    )}
                  </td>
                  {showArchived && (
                    <td style={{ padding: "0.75rem", border: "1px solid #eee", fontFamily: "Poppins", fontSize: 13 }}>
                      {u.deleted_at ? new Date(u.deleted_at).toLocaleString("pt-BR") : "-"}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal para criação/edição de usuário */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
          onClick={() => !formLoading && setShowModal(false)}
        >
          <form
            onClick={e => e.stopPropagation()}
            onSubmit={handleCreateOrUpdateUser}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "16px",
              minWidth: "320px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontFamily: "Poppins",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
              {editMode ? "Atualizar Usuário" : "Adicionar Usuário"}
            </h3>
            <input
              type="text"
              placeholder="Nome"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required={!editMode}
              disabled={formLoading}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                fontFamily: "Poppins",
              }}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required={!editMode}
              disabled={formLoading}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                fontFamily: "Poppins",
              }}
            />
            <input
              type="password"
              placeholder={editMode ? "Nova senha (opcional)" : "Senha"}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required={!editMode}
              disabled={formLoading}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                fontFamily: "Poppins",
              }}
            />
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value as UserRole })}
              disabled={formLoading}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                fontFamily: "Poppins",
                background: "#f7f7f7",
              }}
            >
              <option value={UserRole.User}>Funcionário</option>
              <option value={UserRole.Admin}>Gestor</option>
            </select>
            <button
              type="submit"
              disabled={formLoading}
              style={{
                background: "#2d3a4a",
                color: "#fff",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                fontWeight: 600,
                fontSize: "1rem",
                fontFamily: "Poppins",
                cursor: formLoading ? "not-allowed" : "pointer",
                marginTop: "1rem",
              }}
            >
              {formLoading ? (editMode ? "Atualizando..." : "Salvando...") : (editMode ? "Atualizar" : "Salvar")}
            </button>
            {formError && (
              <div style={{
                color: "#d1364e",
                background: "#ffeaea",
                padding: "0.5rem",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: 500,
                fontFamily: "Poppins",
              }}>
                {formError}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}