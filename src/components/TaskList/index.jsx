import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [form, setForm] = useState({ titulo: "", descricao: "", data: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const db = getFirestore();

  // Função para buscar as tarefas e atualizar o estado
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      taskList.sort((a, b) => new Date(a.data) - new Date(b.data));
      setTasks(taskList);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [db]);

  //Função para alterar o campo de data para o formato de Brasilia
  const formatDateToBrazilian = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  //Função para alterar o campo de data do input
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const offset = d.getTimezoneOffset() * 60000;
    const localDate = new Date(d.getTime() - offset);
    return localDate.toISOString().split("T")[0];
  };

  //Função para selecionar a task clicada para alteração
  const handleTaskUpdateClick = (task) => {
    setSelectedTask(task);
    setForm({
      titulo: task.titulo,
      descricao: task.descricao,
      data: formatDateForInput(task.data),
    });
    setIsNewTask(false);
    setShowModal(true);
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
    setErrorMessage("");
  };
  //Função para alterar as informações da task
  const handleTaskUpdateSubmit = async () => {
    if (!form.titulo || !form.descricao || !form.data) {
      setErrorMessage("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      const date = new Date(form.data);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      if (isNewTask) {
        await addDoc(collection(db, "tasks"), {
          ...form,
          data: date.toISOString(),
        });
      } else {
        const taskRef = doc(db, "tasks", selectedTask.id);
        await updateDoc(taskRef, {
          ...form,
          data: date.toISOString(),
        });
      }

      setShowModal(false);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Erro ao salvar tarefa.");
    }
  };
  //Função para criar nova task
  const handleCreateNewTask = () => {
    setSelectedTask(null);
    setForm({ titulo: "", descricao: "", data: "" });
    setIsNewTask(true);
    setShowModal(true);
  };

  //Função que fecha o modal
  const handleModalClose = () => {
    setShowModal(false);
  };

  //Função para deletar a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Erro ao excluir tarefa.");
    }
  };

  //Função para alterar a class da task para alterar o estilo
  const getTaskClassName = (taskDate) => {
    const today = new Date();
    const taskDueDate = new Date(taskDate);

    return taskDueDate < today ? "task-item expired" : "task-item active";
  };

  return (
    <div className="container-task-list">
      <div className="titulo">
        <h1>Lista de Tarefas</h1>
      </div>

      <div className="scroll">
        <ul className="ul-task">
          {tasks.map((task) => (
            <li
              key={task.id}
              onClick={() => handleTaskUpdateClick(task)}
              className={getTaskClassName(task.data)}
            >
              <div className="task-info">
                <h2>{task.titulo}</h2>
                <p>{task.descricao}</p>
                <p>{formatDateToBrazilian(task.data)}</p>{" "}
              </div>

              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-task-btn">
        <button onClick={handleCreateNewTask} className="new-task-button">
          Nova Tarefa
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isNewTask ? "Criar Nova Tarefa" : "Editar Tarefa"}</h2>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                id="titulo"
                value={form.titulo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                id="descricao"
                value={form.descricao}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data">Data</label>
              <input
                type="date"
                id="data"
                value={form.data}
                onChange={handleChange}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleModalClose}>
                Cancelar
              </button>

              <button className="save-button" onClick={handleTaskUpdateSubmit}>
                {isNewTask ? "Criar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
