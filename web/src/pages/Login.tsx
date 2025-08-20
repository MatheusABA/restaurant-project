import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await authService.login(email, password);
      login(token);
    } catch {
      setError("Credenciais inválidas");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token && loading) {
      setLoading(false);
      setError("Erro ao fazer login. Verifique suas credenciais.");
  
      const timer = setTimeout(() => setError(""), 800);
      return () => clearTimeout(timer);
    }
  }, [token, loading, navigate]);

  useEffect(() => {
    if (token && loading) {
      setSuccess("Login bem-sucedido! Você será redirecionado.");
      const timer = setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 800)

      return () => clearTimeout(timer);
    }
  }, [token, navigate, loading]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          border: "1px solid #e0e7ef",
          minWidth: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          fontFamily: "Poppins",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#2d3a4a", fontWeight: 600, fontFamily: "Poppins" }}>Faça login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
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
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            fontFamily: "Poppins",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "gray" :"#2d3a4a",
            color: "#fff",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Poppins",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {loading ? (
            <>
              <span>Iniciando sessão...</span>
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  border: "3px solid #fff",
                  borderTop: "3px solid #2d3a4a",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 1s linear infinite",
                }}
              />
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </>
          ) : (
            "Entrar"
          )}
        </button>
        {error && (
          <div
            style={{
              background: "#ff0033",
              color: "#fff",
              padding: "0.75rem",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "0.5rem",
              fontFamily: "Poppins",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              fontWeight: 600,
              transition: "opacity 0.3s",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "#33994e",
              color: "##fff",
              padding: "0.75rem",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "0.5rem",
              fontFamily: "Poppins",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              fontWeight: 600,
              transition: "opacity 0.3s"
            }}
          >
            {success}
          </div>
        )}
      </form>
    </div>
  );
}