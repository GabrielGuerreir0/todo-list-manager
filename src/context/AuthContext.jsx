import React, { createContext, useState, useContext, useEffect } from "react";

// Criação do contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente de provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [idToken, setIdToken] = useState(() => {
    return localStorage.getItem("todoListManager:idToken");
  });
  useEffect(() => {
    if (idToken) {
      localStorage.setItem("todoListManager:idToken", idToken);
    } else {
      localStorage.removeItem("todoListManager:idToken");
    }
  }, [idToken]);

  return (
    <AuthContext.Provider value={{ idToken, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
};
