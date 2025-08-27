import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

export default function App() {
  const [reload, setReload] = useState(0);

  return (
    <div className="container">
      <h1>Gestor de Tareas</h1>
      <TaskForm onTaskCreated={() => setReload(r => r + 1)} />
      <TaskList reload={reload} />
    </div>
  );
}
