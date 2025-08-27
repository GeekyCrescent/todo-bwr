import mysql.connector
import os

def get_connection():
    conn = mysql.connector.connect(
        host=os.getenv("DB_HOST", "db"),   
        port=int(os.getenv("DB_PORT", 3306)), 
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASSWORD", "root"),
        database=os.getenv("DB_NAME", "todo_db")
    )
    return conn
