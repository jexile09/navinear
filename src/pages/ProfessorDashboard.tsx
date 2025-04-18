// src/pages/ProfessorDashboard.tsx
import { useEffect, useState } from "react";
import "./ProfessorDashboard.css";

// Define the structure for each appointment entry
interface Appointment {
  student_name: string;
  student_email: string;
  time_slot: string;
  reason: string;
  additional_notes?: string; // Optional field for additional notes
  course_id?: string;        // Optional field for course ID
}

export default function ProfessorDashboard() {
  // State to hold the list of upcoming appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch appointments when the component mounts
  useEffect(() => {
    // Get logged-in user info from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Only proceed if user is valid and has an ID
    if (user && user.id) {
      fetch(`http://localhost:5000/api/appointments/professor/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          const now = new Date();

          // Filter to show only future appointments
          const upcoming = data.filter((appt: Appointment) => {
            const dateObj = new Date(appt.time_slot);
            return dateObj > now;
          });

          // Save to state
          setAppointments(upcoming);
        })
        .catch((err) => console.error("Error fetching appointments:", err));
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Professor Dashboard</h1>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Email</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Additional Notes</th> {/* Column for notes */}
            <th>Course</th> {/* Column for course ID */}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={index}>
              <td>{appt.student_name}</td>
              <td>{appt.student_email}</td>
              <td>{appt.time_slot}</td>
              <td>{appt.reason}</td>
              <td>{appt.additional_notes || "—"}</td> {/* Gracefully fallback to dash */}
              <td>{appt.course_id || "—"}</td> {/* Show course ID or dash */}
            </tr>
          ))}

          {/* Show message if no appointments exist */}
          {appointments.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                No upcoming appointments.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
