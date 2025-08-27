from fastapi import FastAPI, HTTPException
from database import get_connection
from models import Task
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Crear tarea
@app.post("/tasks")
def create_task(task: Task):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    # Guardamos el número en binario
    numero_bin = format(task.numero, "b")

    sql = "INSERT INTO tasks (titulo, numero, descripcion, estado) VALUES (%s, %s, %s, %s)"
    values = (task.titulo, numero_bin, task.descripcion, task.estado)
    cursor.execute(sql, values)
    conn.commit()

    task_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return {"id": task_id, "titulo": task.titulo, "numero": numero_bin, "descripcion": task.descripcion, "estado": task.estado}

# Listar todas las tareas
@app.get("/tasks")
def list_tasks():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    return tasks

# Actualizar estado
@app.put("/tasks/{task_id}")
def update_task(task_id: int, estado: str):
    conn = get_connection()
    cursor = conn.cursor()
    sql = "UPDATE tasks SET estado=%s WHERE id=%s"
    cursor.execute(sql, (estado, task_id))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    cursor.close()
    conn.close()
    return {"message": "Estado actualizado"}

# Eliminar tarea
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    sql = "DELETE FROM tasks WHERE id=%s"
    cursor.execute(sql, (task_id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    cursor.close()
    conn.close()
    return {"message": "Tarea eliminada"}
