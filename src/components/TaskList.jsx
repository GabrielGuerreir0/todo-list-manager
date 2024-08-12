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

const TaskList = () => {
  // Estado para armazenar as tarefas, a tarefa selecionada, se o modal está visível,
  // se é uma nova tarefa, os dados do formulário, e mensagens de erro.
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);
  const [form, setForm] = useState({ titulo: "", descricao: "", data: "" });
  const [errorMessage, setErrorMessage] = useState("");

  // Referência ao banco de dados Firestore.
  const db = getFirestore();

  // useEffect para buscar as tarefas ao montar o componente.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const taskList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordena as tarefas por data de vencimento.
        taskList.sort((a, b) => new Date(a.data) - new Date(b.data));
        setTasks(taskList);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, [db]);

  // Formata a data para o formato brasileiro (dd/mm/aaaa).
  const formatDateToBrazilian = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  // Formata a data para ser utilizada em um input (aaaa-mm-dd).
  const formatDateForInput = (date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Ajusta para o fuso horário local.
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // Ao clicar em uma tarefa, preenche o formulário com os dados dela.
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setForm({
      titulo: task.titulo,
      descricao: task.descricao,
      data: formatDateForInput(task.data),
    });
    setIsNewTask(false);
    setShowModal(true);
  };

  // Atualiza o estado do formulário ao alterar os campos.
  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
    setErrorMessage(""); // Limpa a mensagem de erro ao digitar.
  };

  // Envia o formulário, validando os campos e adicionando ou atualizando a tarefa.
  const handleSubmit = async () => {
    if (!form.titulo || !form.descricao || !form.data) {
      setErrorMessage("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      const date = new Date(form.data);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Ajusta a data para UTC.

      if (isNewTask) {
        // Adiciona uma nova tarefa.
        const docRef = await addDoc(collection(db, "tasks"), {
          ...form,
          data: date.toISOString(),
        });
        const newTask = { id: docRef.id, ...form };
        // Atualiza a lista de tarefas com a nova tarefa.
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks, newTask];
          return updatedTasks.sort(
            (a, b) => new Date(a.data) - new Date(b.data)
          );
        });
      } else {
        // Atualiza uma tarefa existente.
        const taskRef = doc(db, "tasks", selectedTask.id);
        await updateDoc(taskRef, {
          ...form,
          data: date.toISOString(),
        });
        setTasks((prevTasks) =>
          prevTasks
            .map((task) =>
              task.id === selectedTask.id ? { ...task, ...form } : task
            )
            .sort((a, b) => new Date(a.data) - new Date(b.data))
        );
      }
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Erro ao salvar tarefa.");
    }
  };

  // Cria uma nova tarefa, limpando o formulário e abrindo o modal.
  const handleNewTask = () => {
    setSelectedTask(null);
    setForm({ titulo: "", descricao: "", data: "" });
    setIsNewTask(true);
    setShowModal(true);
  };

  // Fecha o modal.
  const handleClose = () => {
    setShowModal(false);
  };

  // Exclui uma tarefa.
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      // Remove a tarefa da lista.
      setTasks((prevTasks) =>
        prevTasks
          .filter((task) => task.id !== id)
          .sort((a, b) => new Date(a.data) - new Date(b.data))
      );
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      alert("Erro ao excluir tarefa.");
    }
  };

  // Define a classe CSS da tarefa com base na data (vencida ou ativa).
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
              onClick={() => handleTaskClick(task)}
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
                  e.stopPropagation(); // Previne a propagação do evento para o clique do item
                  handleDelete(task.id);
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-task-btn">
        <button onClick={handleNewTask} className="new-task-button">
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
              <button className="cancel-button" onClick={handleClose}>
                Cancelar
              </button>
              <button className="save-button" onClick={handleSubmit}>
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
