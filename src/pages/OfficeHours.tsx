import React, { useEffect, useState } from "react";
import "./OfficeHours.css";

interface Professor {
  id: number;
  name: string;
  office: string;
  office_hours: string | null;
  email: string;
  phone: string | null;
  course_id: string | null;
}

const OfficeHours: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/professors")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch professors");
        return res.json();
      })
      .then((data: Professor[]) => {
        setProfessors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Unable to load professor data.");
        setLoading(false);
      });
  }, []);

  const selectedProfessor = professors.find((p) => p.id === selectedId);

  const filteredOfficeHours = professors.filter((entry) => {
    const dayMatch =
      filter === "All" ||
      entry.office_hours?.toLowerCase().includes(filter.toLowerCase().slice(0, 3));
    const nameMatch = entry.name.toLowerCase().includes(search.toLowerCase());
    return dayMatch && nameMatch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId || !studentName || !studentEmail || !timeSlot) {
      alert("Please fill all fields");
      return;
    }

    const appointment = {
      professor_id: selectedId,
      student_name: studentName,
      student_email: studentEmail,
      time_slot: timeSlot,
    };

    const res = await fetch("http://127.0.0.1:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    });

    if (res.ok) {
      alert("Appointment submitted!");
      setStudentName("");
      setStudentEmail("");
      setTimeSlot("");
    } else {
      alert("Submission failed.");
    }
  };

  return (
    <div className="office-hours-wrapper">
      <div className="office-hours-container">
        {/* Left Section - Professor Info */}
        <div className="professor-info">
          <h2>Professor Office Hours</h2>
          <select
            value={selectedId ?? ""}
            onChange={(e) => setSelectedId(Number(e.target.value) || null)}
          >
            <option value="">-- Select a Professor --</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Days</option>
            <option value="Mon">Monday</option>
            <option value="Tue">Tuesday</option>
            <option value="Wed">Wednesday</option>
            <option value="Thu">Thursday</option>
            <option value="Fri">Friday</option>
          </select>

          <input
            type="text"
            placeholder="Search professor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {selectedProfessor && (
            <div className="professor-card">
              <h3>{selectedProfessor.name}</h3>
              <p><strong>Office:</strong> {selectedProfessor.office || "TBD"}</p>
              <p><strong>Office Hours:</strong> {selectedProfessor.office_hours || "Not available"}</p>
              <p><strong>Email:</strong> {selectedProfessor.email}</p>
              <p><strong>Phone:</strong> {selectedProfessor.phone || "N/A"}</p>
              <p><strong>Course:</strong> {selectedProfessor.course_id || "N/A"}</p>
            </div>
          )}

          {loading ? (
            <p className="text-gray-500">Loading professors...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="professor-list">
              {filteredOfficeHours.length > 0 ? (
                filteredOfficeHours.map((prof) => (
                  <li key={prof.id}>
                    <strong>{prof.name}</strong> – {prof.office_hours || "No hours available"}
                  </li>
                ))
              ) : (
                <li className="text-red-500">No matches found</li>
              )}
            </ul>
          )}
        </div>

        {/* Right Section - Appointment Form */}
        <div className="student-form">
          <h2>Book Appointment</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Preferred Time Slot (e.g. Tue 2:15 PM)"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            />
            <button type="submit">Submit Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficeHours;