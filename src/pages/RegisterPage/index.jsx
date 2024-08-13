import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import iconeLogin from "../../../public/imgs/icon-login.svg";
import "./Register.css";

const formRegister = [
  { id: "nome", label: "Nome", type: "text" },
  { id: "email", label: "E-mail", type: "email" },
  { id: "senha", label: "Senha", type: "password" },
  { id: "confirmarSenha", label: "Confirmar Senha", type: "password" },
];

const Register = () => {
  const [form, setForm] = useState(
    formRegister.reduce((acc, field) => {
      return {
        ...acc,
        [field.id]: "",
      };
    }, {})
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Atualiza o stado do formulario
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({
      ...form,
      [id]: value,
    });
    setError("");
  };

  //Cadastra Usuario
  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    const { email, senha, confirmarSenha } = form;

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
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar", error);
      setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  //Cancela o cadastro
  const handleCancelRegister = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="container-bg-register">
      <div className="register-container">
        <div className="register-img">
          <img src={iconeLogin} alt="icone de cadastro" />
        </div>

        <div className="contain-form-register">
          <h1>Cadastrar</h1>
          <form onSubmit={handleRegisterFormSubmit}>
            {formRegister.map(({ id, type, label }) => (
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

            <div className="operacoes-register">
              <button type="submit">Cadastrar</button>

              <button
                className="btn-cansel"
                type="button"
                onClick={handleCancelRegister}
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

export default Register;
