import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import User from "./pages/UserProfilePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

const App = () => {
  const auth = useAuth();
  const isLoggedIn = !!auth.idToken;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/cadastrar"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/usuario"
          element={isLoggedIn ? <User /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
