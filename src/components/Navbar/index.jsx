import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from "../../../public/imgs/icon-login.svg";
import "./NavBar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  // Estado que controla se o menu hambúrguer está aberto ou fechado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para navegação entre páginas.
  const navigate = useNavigate();

  // Função que lida com a autenticação do Firebase.
  const auth = getAuth();

  const { setIdToken } = useAuth();

  // Função que lida com o logout do usuário.
  const handleLogout = async (e) => {
    e.preventDefault();

    // Pede confirmação do usuário antes de fazer logout.
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (!confirmLogout) {
      return; // Se o usuário cancelar, não faz logout.
    }

    try {
      await signOut(auth); // Desloga o usuário.
      setIdToken(null); // Limpa o token de autenticação.
      navigate("/login"); // Redireciona para a página de login.
    } catch (error) {
      console.error("Erro ao sair:", error); // Loga o erro no console.
      // Pode exibir uma mensagem de erro para o usuário, se necessário.
    }
  };

  // Alterna o estado do menu hambúrguer entre aberto e fechado.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-bg">
      <nav className="navegacao">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h1>Your Times</h1>
          </div>
        </Link>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul className={`user-nav ${isMenuOpen ? "open" : ""}`}>
            <Link to="/usuario">
              <li className="li-user">Usuário</li>
            </Link>
            <Link to="/login" onClick={handleLogout}>
              <li className="li-user">Logout</li>
            </Link>
          </ul>
        </div>
        <div
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
