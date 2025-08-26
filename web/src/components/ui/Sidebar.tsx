import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Assessment, Groups2Sharp, HomeFilled, Logout, Person } from "@mui/icons-material";
import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled, TbMenuOrder, } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [open, setOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: open ? "220px" : "60px",
          transition: "width 0.5s",
          background: "#2d3a4a",
          color: "#fff",
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: open ? "flex-start" : "center",
          padding: open ? "1.5rem 1rem" : "1.5rem 0.5rem",
        }}
      >
        <div>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              marginBottom: "2rem",
              alignSelf: open ? "auto" : "center",
              display: "flex",
              justifyContent: open ? "flex-start" : "center",
              width: "100%",
            }}
            title={open ? "Fechar sidebar" : "Abrir sidebar"}
          >
            {open ? <TbArrowBigLeftLineFilled /> : <TbArrowBigRightLineFilled/>}
          </button>
          <nav style={{ width: "100%" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li
                style={{
                  marginBottom: "1.5rem",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isActive("/") ? "center" : open ? "flex-start" : "center",
                  height: "40px",
                  background: isActive("/") ? "#fff" : "transparent",
                  color: isActive("/") ? "#2d3a4a" : "#fff",
                  borderRadius: "8px",
                  transition: "background 0.2s, color 0.2s",
                  textAlign: isActive("/") ? "center" : "left",
                  padding: isActive("/") ? "0 1rem" : "0",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLLIElement).style.background = "#fff";
                  (e.currentTarget as HTMLLIElement).style.color = "#2d3a4a";
                  (e.currentTarget as HTMLLIElement).style.justifyContent = "center";
                  (e.currentTarget as HTMLLIElement).style.textAlign = "center";
                  (e.currentTarget as HTMLLIElement).style.padding = "0 1rem";
                }}
                onMouseLeave={e => {
                  if (!isActive("/")) {
                    (e.currentTarget as HTMLLIElement).style.background = "transparent";
                    (e.currentTarget as HTMLLIElement).style.color = "#fff";
                    (e.currentTarget as HTMLLIElement).style.justifyContent = open ? "flex-start" : "center";
                    (e.currentTarget as HTMLLIElement).style.textAlign = "left";
                    (e.currentTarget as HTMLLIElement).style.padding = "0";
                  }
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  {open ? "Início" : <HomeFilled />}
                </Link>
              </li>
              <li
                style={{
                  marginBottom: "1.5rem",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isActive("/profile") ? "center" : open ? "flex-start" : "center",
                  height: "40px",
                  background: isActive("/profile") ? "#fff" : "transparent",
                  color: isActive("/profile") ? "#2d3a4a" : "#fff",
                  borderRadius: "8px",
                  transition: "background 0.2s, color 0.2s",
                  textAlign: isActive("/profile") ? "center" : "left",
                  padding: isActive("/profile") ? "0 1rem" : "0",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLLIElement).style.background = "#fff";
                  (e.currentTarget as HTMLLIElement).style.color = "#2d3a4a";
                  (e.currentTarget as HTMLLIElement).style.justifyContent = "center";
                  (e.currentTarget as HTMLLIElement).style.textAlign = "center";
                  (e.currentTarget as HTMLLIElement).style.padding = "0 1rem";
                }}
                onMouseLeave={e => {
                  if (!isActive("/profile")) {
                    (e.currentTarget as HTMLLIElement).style.background = "transparent";
                    (e.currentTarget as HTMLLIElement).style.color = "#fff";
                    (e.currentTarget as HTMLLIElement).style.justifyContent = open ? "flex-start" : "center";
                    (e.currentTarget as HTMLLIElement).style.textAlign = "left";
                    (e.currentTarget as HTMLLIElement).style.padding = "0";
                  }
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  {open ? "Perfil" : <Person />}
                </Link>
              </li>
              <li
                style={{
                  marginBottom: "1.5rem",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isActive("/employees") ? "center" : open ? "flex-start" : "center",
                  height: "40px",
                  background: isActive("/employees") ? "#fff" : "transparent",
                  color: isActive("/employees") ? "#2d3a4a" : "#fff",
                  borderRadius: "8px",
                  transition: "background 0.2s, color 0.2s",
                  textAlign: isActive("/employees") ? "center" : "left",
                  padding: isActive("/employees") ? "0 1rem" : "0",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLLIElement).style.background = "#fff";
                  (e.currentTarget as HTMLLIElement).style.color = "#2d3a4a";
                  (e.currentTarget as HTMLLIElement).style.justifyContent = "center";
                  (e.currentTarget as HTMLLIElement).style.textAlign = "center";
                  (e.currentTarget as HTMLLIElement).style.padding = "0 1rem";
                }}
                onMouseLeave={e => {
                  if (!isActive("/employees")) {
                    (e.currentTarget as HTMLLIElement).style.background = "transparent";
                    (e.currentTarget as HTMLLIElement).style.color = "#fff";
                    (e.currentTarget as HTMLLIElement).style.justifyContent = open ? "flex-start" : "center";
                    (e.currentTarget as HTMLLIElement).style.textAlign = "left";
                    (e.currentTarget as HTMLLIElement).style.padding = "0";
                  }
                }}
              >
                <Link
                  to="/employees"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  {open ? "Funcionários" : <Groups2Sharp />}
                </Link>
              </li>
              <li
                style={{
                  marginBottom: "1.5rem",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isActive("/reports") ? "center" : open ? "flex-start" : "center",
                  height: "40px",
                  background: isActive("/reports") ? "#fff" : "transparent",
                  color: isActive("/reports") ? "#2d3a4a" : "#fff",
                  borderRadius: "8px",
                  transition: "background 0.2s, color 0.2s",
                  textAlign: isActive("/reports") ? "center" : "left",
                  padding: isActive("/reports") ? "0 1rem" : "0",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLLIElement).style.background = "#fff";
                  (e.currentTarget as HTMLLIElement).style.color = "#2d3a4a";
                  (e.currentTarget as HTMLLIElement).style.justifyContent = "center";
                  (e.currentTarget as HTMLLIElement).style.textAlign = "center";
                  (e.currentTarget as HTMLLIElement).style.padding = "0 1rem";
                }}
                onMouseLeave={e => {
                  if (!isActive("/reports")) {
                    (e.currentTarget as HTMLLIElement).style.background = "transparent";
                    (e.currentTarget as HTMLLIElement).style.color = "#fff";
                    (e.currentTarget as HTMLLIElement).style.justifyContent = open ? "flex-start" : "center";
                    (e.currentTarget as HTMLLIElement).style.textAlign = "left";
                    (e.currentTarget as HTMLLIElement).style.padding = "0";
                  }
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  {open ? "Pedidos" : <TbMenuOrder />}
                </Link>
              </li>
              <li
                style={{
                  marginBottom: "1.5rem",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  fontFamily: "Poppins",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isActive("/reports") ? "center" : open ? "flex-start" : "center",
                  height: "40px",
                  background: isActive("/reports") ? "#fff" : "transparent",
                  color: isActive("/reports") ? "#2d3a4a" : "#fff",
                  borderRadius: "8px",
                  transition: "background 0.2s, color 0.2s",
                  textAlign: isActive("/reports") ? "center" : "left",
                  padding: isActive("/reports") ? "0 1rem" : "0",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLLIElement).style.background = "#fff";
                  (e.currentTarget as HTMLLIElement).style.color = "#2d3a4a";
                  (e.currentTarget as HTMLLIElement).style.justifyContent = "center";
                  (e.currentTarget as HTMLLIElement).style.textAlign = "center";
                  (e.currentTarget as HTMLLIElement).style.padding = "0 1rem";
                }}
                onMouseLeave={e => {
                  if (!isActive("/reports")) {
                    (e.currentTarget as HTMLLIElement).style.background = "transparent";
                    (e.currentTarget as HTMLLIElement).style.color = "#fff";
                    (e.currentTarget as HTMLLIElement).style.justifyContent = open ? "flex-start" : "center";
                    (e.currentTarget as HTMLLIElement).style.textAlign = "left";
                    (e.currentTarget as HTMLLIElement).style.padding = "0";
                  }
                }}
              >
                <Link
                  to="/"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    width: "100%",
                    justifyContent: open ? "flex-start" : "center",
                  }}
                >
                  {open ? "Relatórios" : <Assessment />}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <button
          onClick={logout}
          style={{
            background: "#d1364e",
            color: "#000",
            padding: open ? "0.75rem 1.5rem" : "0.75rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            width: open ? "200px" : "40px",
            height: open ? "43px" : "40px",
            alignSelf: open ? "flex-start" : "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "width 0.5s",
            left: open ? "1rem" : "0.5rem",
            right: open ? "1rem" : "0.5rem",
            bottom: "1rem",
          }}
        >
          {open ? "Sair" : <Logout />}
        </button>
        {children}
      </div>
    </div>
  );
}