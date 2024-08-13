import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import iconeLogin from "../../../public/imgs/icon-login.svg";
import "./Login.css";

const formLogin = [
  { id: "email", label: "E-mail", type: "email" },
  { id: "senha", label: "Senha", type: "password" },
];

const Login = () => {
  // Inicializa o estado do formulário com campos vazios.
  const [form, setForm] = useState(
    formLogin.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: "",
      }),
      {}
    )
  );

  const [error, setError] = useState("");
  const { setIdToken } = useAuth();
  const navigate = useNavigate();

  // Atualiza o estado do formulário conforme o usuário digita.
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
    setError("");
  };

  // Lida com o envio do formulário, realizando o login.
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, senha } = form;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const token = await userCredential.user.getIdToken();
      setIdToken(token);
      navigate("/");
    } catch (error) {
      setError("E-mail ou senha incorretos.");
    }
  };

  // Redireciona o usuário para a página de cadastro.
  const handleRegisterRedirect = () => {
    navigate("/cadastrar");
  };

  return (
    <div className="container-bg-login">
      <div className="login-container">
        <div className="login-img">
          <img src={iconeLogin} alt="icone de login" />
        </div>

        <div className="contain-form-login">
          <h1>Login</h1>

          <form onSubmit={handleFormSubmit}>
            {formLogin.map(({ id, type, label }) => (
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
              <a onClick={handleRegisterRedirect}>Cadastre-se</a>
              <button type="submit">Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
