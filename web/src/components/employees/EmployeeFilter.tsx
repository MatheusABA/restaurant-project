interface EmployeeFilterProps {
  filterRole: string;
  setFilterRole: (role: string) => void;
  filterId: string;
  setFilterId: (id: string) => void;
  onClear: () => void;
  onApply: () => void;
  UserRole: { User: string; Admin: string };
}

export default function EmployeeFilter({
  filterRole,
  setFilterRole,
  filterId,
  setFilterId,
  onClear,
  onApply,
  UserRole,
}: EmployeeFilterProps) {
  return (
    <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center" }}>
      <label style={{ fontFamily: "Poppins", fontWeight: 500 }}>
        Cargo:&nbsp;
        <select
          value={filterRole}
          onChange={e => setFilterRole(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontFamily: "Poppins",
            background: "#f7f7f7",
          }}
        >
          <option value="all">Todos</option>
          <option value={UserRole.User}>Funcionário</option>
          <option value={UserRole.Admin}>Gestor</option>
        </select>
      </label>
      <label style={{ fontFamily: "Poppins", fontWeight: 500 }}>
        ID:&nbsp;
        <input
          type="number"
          min={1}
          value={filterId}
          onChange={e => setFilterId(e.target.value)}
          placeholder="Filtrar por ID"
          style={{
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontFamily: "Poppins",
            width: "120px",
          }}
        />
      </label>
      <button
        style={{
          background: "#18b862",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          fontFamily: "Poppins",
          cursor: "pointer",
          fontWeight: 500,
        }}
        onClick={onApply}
      >
        Aplicar Filtros
      </button>
      <button
        style={{
          background: "#e0e7ef",
          color: "#2d3a4a",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          fontFamily: "Poppins",
          cursor: "pointer",
          fontWeight: 500,
        }}
        onClick={onClear}
      >
        Limpar filtros
      </button>
    </div>
  );
}