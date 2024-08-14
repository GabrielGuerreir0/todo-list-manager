import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./index";
import { getDocs, deleteDoc } from "firebase/firestore";

// Mock do Firebase Firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock para tarefas de exemplo
const mockTasks = [
  {
    id: "1",
    titulo: "Tarefa 1",
    descricao: "Descrição da Tarefa 1",
    data: new Date().toISOString(),
  },
  {
    id: "2",
    titulo: "Tarefa 2",
    descricao: "Descrição da Tarefa 2",
    data: new Date().toISOString(),
  },
];

describe("TaskList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar a lista de tarefas corretamente", async () => {
    getDocs.mockResolvedValue({
      docs: mockTasks.map((task) => ({
        id: task.id,
        data: () => task,
      })),
    });

    render(<TaskList />);

    // Verifica se os títulos das tarefas são exibidos
    expect(await screen.findByText("Tarefa 1")).toBeInTheDocument();
    expect(await screen.findByText("Tarefa 2")).toBeInTheDocument();
  });

  test('deve abrir o modal ao clicar em "Nova Tarefa"', () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("Nova Tarefa"));
    expect(screen.getByText("Criar Nova Tarefa")).toBeInTheDocument();
  });

  test("deve mostrar mensagem de erro se campos obrigatórios estiverem vazios", async () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("Nova Tarefa"));
    fireEvent.click(screen.getByText("Criar"));
    expect(
      screen.getByText("Todos os campos devem ser preenchidos!")
    ).toBeInTheDocument();
  });

  test('deve fechar o modal ao clicar em "Cancelar"', () => {
    render(<TaskList />);
    fireEvent.click(screen.getByText("Nova Tarefa"));
    fireEvent.click(screen.getByText("Cancelar"));
    expect(screen.queryByText("Criar Nova Tarefa")).not.toBeInTheDocument();
  });
});
