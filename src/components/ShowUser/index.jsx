import React, { useEffect, useState } from "react";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import userPhoto from "../../../public/imgs/icon-login.svg";
import "./ShowUser.css";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ShowUser = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth();
  const { setIdToken } = useAuth();

  // useEffect para carregar os dados do usuário autenticado quando o componente é montado.
  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        email: currentUser.email,
        uid: currentUser.uid,
      });
    } else {
      console.log("Nenhum usuário logado.");
    }
  }, [auth]);

  // Função para deletar a conta do usuário autenticado.
  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.currentUser);
      setIdToken(null);
      Navigate("/login");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setErrorMessage("Erro ao excluir usuário.");
    }
  };

  // Função para deslogar o usuário.
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIdToken(null);
      Navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      setErrorMessage("Erro ao sair.");
    }
  };

  return (
    <div className="show-user-container">
      <div className="container-user">
        {user ? (
          <div className="user-info">
            <h1>Dados de {user.email}</h1>

            <div className="imagem-user">
              <img src={userPhoto} alt="foto usuario" />
            </div>

            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>ID:</strong> {user.uid}
            </p>

            <div className="bts-operacoes">
              <button className="btn-deletar-user" onClick={handleDeleteUser}>
                Deletar Usuário
              </button>

              <button className="btn-logout" onClick={handleSignOut}>
                Sair
              </button>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}
      </div>
    </div>
  );
};

export default ShowUser;
