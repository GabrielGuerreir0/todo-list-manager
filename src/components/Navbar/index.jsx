import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from "../../../public/imgs/icon-login.svg";
import "./NavBar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const { setIdToken } = useAuth();

  // Função que lida com o logout do usuário.
  const handleLogout = async (e) => {
    e.preventDefault();

    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (!confirmLogout) {
      return;
    }

    try {
      await signOut(auth);
      setIdToken(null);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
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
