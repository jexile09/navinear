# run with: flask run
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3, os

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'campus_navigator.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ========================
# Get list of all professors
@app.route('/api/professors', methods=['GET'])
def get_professors():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM Professors').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

# ========================
# Get taken time slots for a professor on a given date
@app.route('/api/appointments/<int:professor_id>/<date>', methods=['GET'])
def get_taken_appointments(professor_id, date):
    conn = get_db_connection()
    rows = conn.execute(
        'SELECT time_slot FROM Appointment WHERE professor_id = ? AND time_slot LIKE ?',
        (professor_id, f"{date}%")
    ).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

# ========================
# Create a student appointment
@app.route('/api/students', methods=['POST'])
def create_appointment():
    data = request.get_json() or {}
    try:
        prof = data['professor_id']
        name = data['student_name']
        email = data['student_email']
        slot = data['time_slot']
        reason = data['reason']
        notes = data.get("additional_notes", "")
        course = data.get("course_id", "").strip()
    except KeyError:
        return jsonify({"error": "Missing fields"}), 400

    conn = get_db_connection()
    try:
        prof_row = conn.execute(
            "SELECT course_id FROM Professors WHERE id = ?",
            (prof,)
        ).fetchone()

        if not prof_row:
            conn.close()
            return jsonify({"error": "Professor not found."}), 404

        valid_courses = [c.strip() for c in (prof_row["course_id"] or "").split(",")]
        if course not in valid_courses:
            conn.close()
            return jsonify({
                "error": f"Invalid course ID. Valid options: {', '.join(valid_courses)}"
            }), 400

        exists = conn.execute(
            'SELECT 1 FROM Appointment WHERE professor_id = ? AND time_slot = ?',
            (prof, slot)
        ).fetchone()
        if exists:
            conn.close()
            return jsonify({"error": "This time slot is already booked."}), 409

        conn.execute(
            'INSERT INTO Appointment (professor_id, student_name, student_email, time_slot, reason, additional_notes, course_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            (prof, name, email, slot, reason, notes, course)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Appointment created"}), 201
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({"error": str(e)}), 500

# ========================
# Professor login + Student login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get("username", "")
    password = data.get("password", "")

    conn = get_db_connection()

    user = conn.execute(
        "SELECT id, username, name FROM Students WHERE username = ? AND password = ?",
        (username, password)
    ).fetchone()
    role = "student"

    if not user:
        user = conn.execute(
            "SELECT id, username, name FROM Professors WHERE username = ? AND password = ?",
            (username, password)
        ).fetchone()
        role = "professor"

    conn.close()

    if user:
        return jsonify({
            "message": "Login successful!",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "name": user["name"],
                "role": role
            }
        }), 200

    return jsonify({"error": "Invalid username or password"}), 401

# ========================
# NEW: Get all appointments for a professor
@app.route("/api/appointments/professor/<int:professor_id>", methods=["GET"])
def get_professor_appointments(professor_id):
    conn = get_db_connection()
    rows = conn.execute("""
        SELECT 
            student_name,
            student_email,
            time_slot,
            reason,
            additional_notes,
            course_id
        FROM Appointment
        WHERE professor_id = ?
    """, (professor_id,)).fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])

# ========================
@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"})

# ========================
if __name__ == '__main__':
    app.run(debug=True)
