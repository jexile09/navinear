// src/pages/ProfessorDashboard.tsx
import { useEffect, useState } from "react";
import "./ProfessorDashboard.css";

// Define the shape of an appointment record
interface Appointment {
  student_name: string;
  student_email: string;
  time_slot: string;
  reason: string;
  additional_notes?: string;
  course_id?: string;
}

export default function ProfessorDashboard() {
  // State: full list of upcoming appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // State: whether to filter to only today's appointments
  const [filterToday, setFilterToday] = useState(false);
  // State: currently selected course filter
  const [selectedCourse, setSelectedCourse] = useState<string>("All");

  // Fetch appointments from the backend when the component mounts
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (!userJson) return;
    const user = JSON.parse(userJson);
    if (user?.id) {
      fetch(`http://localhost:5000/api/appointments/professor/${user.id}`)
        .then((res) => res.json())
        .then((data: Appointment[]) => {
          const now = Date.now();
          // Keep only future appointments and sort them ascending by time
          const upcoming = data
            .filter((a) => new Date(a.time_slot).getTime() > now)
            .sort(
              (a, b) =>
                new Date(a.time_slot).getTime() -
                new Date(b.time_slot).getTime()
            );
          setAppointments(upcoming);
        })
        .catch(console.error);
    }
  }, []);

  // Helper: get today's date in YYYY-MM-DD format
  const todayStr = () => new Date().toISOString().split("T")[0];

  // Apply both the "today" and "course" filters to the appointments list
  const filtered = appointments.filter((a) => {
    const datePart = new Date(a.time_slot).toISOString().split("T")[0];
    const byDate = !filterToday || datePart === todayStr();
    const byCourse =
      selectedCourse === "All" || a.course_id === selectedCourse;
    return byDate && byCourse;
  });

  // Build the list of unique course IDs for the dropdown
  const courses = Array.from(
    new Set(appointments.map((a) => a.course_id || ""))
  )
    .filter((c) => c)
    .sort();

  return (
    <div className="dashboard-container">
      {/* Page title */}
      <h1 className="dashboard-title">Professor Dashboard</h1>

      {/* ─── Filters ───────────────────────────── */}
      <div className="filter-bar">
        {/* Course filter */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="course-select">
            Filter by Course:
          </label>
          <select
            id="course-select"
            className="filter-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="All">All</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Today's appointments checkbox */}
        <div className="filter-group">
          <input
            type="checkbox"
            id="today-only"
            checked={filterToday}
            onChange={() => setFilterToday((v) => !v)}
          />
          <label className="filter-label" htmlFor="today-only">
            Only show today’s appointment
          </label>
        </div>
      </div>

      {/* ─── Appointments Table ─────────────────── */}
      <table className="appointment-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Additional Notes</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((a, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{a.student_name}</td>
                <td>{a.student_email}</td>
                <td>{new Date(a.time_slot).toLocaleString()}</td>
                <td>{a.reason}</td>
                <td>{a.additional_notes || "—"}</td>
                <td>{a.course_id || "—"}</td>
              </tr>
            ))
          ) : (
            /* Show this row when no appointments match the filters */
            <tr>
              <td colSpan={7} className="no-data">
                No upcoming appointments.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
