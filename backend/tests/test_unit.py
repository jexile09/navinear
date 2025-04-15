import os
import sqlite3
import sys

# Fix the typo: use __file__ instead of _file_
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import get_db_connection, DB_PATH

def test_database_file_exists():
    assert os.path.exists(DB_PATH), "Database file does not exist."

def test_db_connection_returns_connection():
    conn = get_db_connection()
    assert isinstance(conn, sqlite3.Connection)
    conn.close()
