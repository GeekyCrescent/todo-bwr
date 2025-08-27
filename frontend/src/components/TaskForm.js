import React, { useState } from "react";
import api from "../api";

function TaskForm({ onTaskCreated = () => {} }) {
  const [titulo, setTitulo] = useState("");
  const [numero, setNumero] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !numero) return;

    try {
      await api.post("/tasks", {
        // NO mandes id: lo genera la DB
        titulo,
        numero: parseInt(numero, 10), // envía decimal; backend lo guarda en binario
        descripcion,
        estado: "pendiente", // si tu backend/DB ya tienen default, puedes omitirlo
      });

      setTitulo("");
      setNumero("");
      setDescripcion("");
      onTaskCreated(); // ya es función por el default
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"         
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Número decimal"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
}

export default TaskForm;
