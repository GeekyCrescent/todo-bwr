from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    titulo: str
    numero: int
    descripcion: Optional[str] = None
    estado: Optional[str] = "pendiente"
