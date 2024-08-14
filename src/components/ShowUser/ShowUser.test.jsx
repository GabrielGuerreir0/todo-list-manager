import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShowUser from "./index";
import { getAuth, deleteUser, signOut } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";

// Mock do Firebase Auth e do AuthContext
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  deleteUser: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock de configuração
const mockSetIdToken = jest.fn();
const mockAuth = {
  currentUser: {
    email: "user@example.com",
    uid: "12345",
  },
};

describe("ShowUser Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAuth.mockReturnValue(mockAuth);
    useAuth.mockReturnValue({
      setIdToken: mockSetIdToken,
    });
  });

  test("deve chamar handleDeleteUser e exibir mensagem de erro em caso de falha", async () => {
    deleteUser.mockRejectedValueOnce(new Error("Erro ao excluir usuário."));

    render(<ShowUser />);

    fireEvent.click(screen.getByText("Deletar Usuário"));

    await waitFor(() => {
      expect(screen.getByText("Erro ao excluir usuário.")).toBeInTheDocument();
    });
  });

  test("deve chamar handleSignOut e exibir mensagem de erro em caso de falha", async () => {
    signOut.mockRejectedValueOnce(new Error("Erro ao sair."));

    render(<ShowUser />);

    fireEvent.click(screen.getByText("Sair"));

    await waitFor(() => {
      expect(screen.getByText("Erro ao sair.")).toBeInTheDocument();
    });
  });
});
