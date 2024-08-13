import React, { useEffect, useState } from "react";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import userPhoto from "../../../public/imgs/icon-login.svg";
import "./ShowUser.css";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ShowUser = () => {
  // Estado para armazenar os dados do usuário autenticado.
  const [user, setUser] = useState(null);

  // Estado para armazenar mensagens de erro.
  const [errorMessage, setErrorMessage] = useState("");

  // Autenticação do Firebase.
  const auth = getAuth();

  const { setIdToken } = useAuth();

  // useEffect para carregar os dados do usuário autenticado quando o componente é montado.
  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      // Se o usuário estiver autenticado, salva suas informações no estado.
      setUser({
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
      });
    } else {
      // Se não houver usuário autenticado, loga a informação no console.
      console.log("Nenhum usuário logado.");
    }
  }, [auth]);

  // Função para deletar a conta do usuário autenticado.
  const handleDeleteUser = async () => {
    try {
      await deleteUser(auth.currentUser); // Deleta o usuário.
      setIdToken(null);
      Navigate("/login"); // Redireciona para a página de login após a exclusão.
    } catch (error) {
      console.error("Erro ao excluir usuário:", error); // Loga o erro no console.
      setErrorMessage("Erro ao excluir usuário."); // Define a mensagem de erro.
    }
  };

  // Função para deslogar o usuário.
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Desloga o usuário.
      setIdToken(null);
      Navigate("/login"); // Redireciona para a página de login após o logout.
    } catch (error) {
      console.error("Erro ao sair:", error); // Loga o erro no console.
      setErrorMessage("Erro ao sair."); // Define a mensagem de erro.
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
