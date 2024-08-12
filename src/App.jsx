import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import HomePage from "./pages/HomePage";
import Cadastrar from "./pages/Cadastrar";
import User from "./pages/User";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/usuario" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
