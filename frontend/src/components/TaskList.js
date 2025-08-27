import React, { useEffect, useState } from "react";
import api from "../api";

export default function TaskList({ reload }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();        // se ejecuta al montar y cada vez que cambia "reload"
  }, [reload]);

  const updateTask = async (id, estado) => {
    await api.put(`/tasks/${id}`, null, { params: { estado } });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <b>{t.titulo}</b> ({t.numero}) - {t.estado}
            <button onClick={() => updateTask(t.id, "en progreso")}>En Progreso</button>
            <button onClick={() => updateTask(t.id, "completado")}>Completado</button>
            <button onClick={() => deleteTask(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
