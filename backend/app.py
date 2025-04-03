# run command for the app: flask run
from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
import os  # ✅ needed for path handling
 
app = Flask(__name__)
CORS(app)  # allows React frontend to call backend
 
# ✅ Set path to database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'campus_navigator.db')  # make sure this matches your file name
 
# ✅ Connect to your database using full path
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
 
# ✅ Main data route
@app.route('/api/professors', methods=['GET'])
def get_professors():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM Professors').fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

# # 🔹 Route to get a single professor by ID
# @app.route('/api/professors/<int:professor_id>', methods=['GET'])
# def get_professor_by_id(professor_id):
#     conn = get_db_connection()
#     rows = conn.execute('SELECT id FROM Professors').fetchall()
#     for prof in rows:
#         if prof['id'] == professor_id:
#             return jsonify(prof)
#     return jsonify({'error': 'Professor not found'}), 404

# # GET /api/rooms
# @app.route('/api/rooms', methods=['GET'])
# def get_professors():
#     conn = get_db_connection()
#     rows = conn.execute('SELECT * FROM Rooms').fetchall()
#     conn.close()
#     return jsonify([dict(row) for row in rows])
 
# ✅ Run the server
if __name__ == '__main__':
    app.run(debug=True)