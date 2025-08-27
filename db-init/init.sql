USE todo_db;

-- Crear Tabla
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    numero VARCHAR(64) NOT NULL,
    descripcion TEXT,
    estado ENUM('pendiente','en progreso','completado') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de prueba al momento de iniciar
INSERT INTO tasks (titulo, numero, descripcion, estado)
VALUES 
('Terminar Pretotipo', BIN(1), 'Terminar entrega de pretotipo', 'en progreso'),
('Ir a entrenamiento de Football', BIN(2), 'Practicar para el torneo', 'completado'),
('Ir al gym', BIN(10), 'Entrenamiento de Upper', 'pendiente');