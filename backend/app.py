# run with: flask run
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for all routes

# Set up the path to the SQLite database
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'campus_navigator.db')

# Function to establish a database connection
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Enables name-based access to columns
    return conn

# Route to fetch all professors
@app.route('/api/professors', methods=['GET'])
def get_professors():
    conn = get_db_connection()
    rows = conn.execute('SELECT * FROM Professors').fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])  # Convert rows to dictionary format for JSON

# Route to create a new student appointment
@app.route('/api/students', methods=['POST'])
def create_appointment():
    data = request.get_json()
    try:
        # Extract appointment data from request
        professor_id = data['professor_id']
        student_name = data['student_name']
        student_email = data['student_email']
        time_slot = data['time_slot']
        reason = data['reason']
    except KeyError:
        return jsonify({"error": "Missing fields"}), 400  # Bad request if any field is missing

    conn = get_db_connection()
    try:
        # Check for existing appointment to prevent double booking
        existing = conn.execute(
            'SELECT * FROM Appointment WHERE professor_id = ? AND time_slot = ?',
            (professor_id, time_slot)
        ).fetchone()
        if existing:
            conn.close()
            return jsonify({"error": "This time slot is already booked."}), 409  # Conflict

        # Insert new appointment
        conn.execute(
            'INSERT INTO Appointment (professor_id, student_name, student_email, time_slot, reason) VALUES (?, ?, ?, ?, ?)',
            (professor_id, student_name, student_email, time_slot, reason)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Appointment created"}), 201  # Created successfully
    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({"error": str(e)}), 500  # Internal server error

# Route to fetch all taken appointment time slots for a specific professor on a specific date
@app.route('/api/appointments/<int:professor_id>/<date>', methods=['GET'])
def get_taken_appointments(professor_id, date):
    conn = get_db_connection()
    # Filter time slots by date prefix 
    rows = conn.execute(
        'SELECT time_slot FROM Appointment WHERE professor_id = ? AND time_slot LIKE ?',
        (professor_id, f"{date}%")
    ).fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])  # Return list of taken time slots

# Start the Flask development server
if __name__ == '__main__':
    app.run(debug=True)
