import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import iconeLogin from "../imgs/icon-login.svg";

const formCadastro = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "email", label: "E-mail", type: "email" },
  { id: "senha", label: "Senha", type: "password" },
  { id: "confirmarSenha", label: "Confirmar Senha", type: "password" },
];

const Cadastrar = () => {
  const [form, setForm] = useState(
    formCadastro.reduce((acc, field) => {
      return {
        ...acc,
        [field.id]: "",
      };
    }, {})
  );
  const [error, setError] = useState(""); // Estado para a mensagem de erro
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({
      ...form,
      [id]: value,
    });
    setError(""); // Limpa o erro ao digitar
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nome, email, senha, confirmarSenha } = form;

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      // Aqui você pode adicionar o nome do usuário ao perfil, se desejar
      // userCredential.user.updateProfile({ displayName: nome });

      // Redireciona para a página de login após o cadastro bem-sucedido
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar", error);
      setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  const handleCancel = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="container-bg-login">
      <div className="login-container">
        <div className="login-img">
          <img src={iconeLogin} alt="icone de cadastro" />
        </div>
        <div className="contain-form-login">
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            {formCadastro.map(({ id, type, label }) => (
              <div key={id}>
                <input
                  type={type}
                  id={id}
                  value={form[id]}
                  placeholder={label}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div style={{ minHeight: "24px", color: "red" }}>
              {error && <p>{error}</p>}
            </div>
            <div className="operacoes">
              <button type="submit">Cadastrar</button>
              <button
                className="btn-cansel"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastrar;
