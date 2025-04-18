// src/pages/OfficeHours.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import "./OfficeHours.css";

// Interfaces to define data structure for professors and appointments
interface Professor {
  id: number;
  name: string;
  office: string;
  office_hours: string | null;
  email: string;
  phone: string | null;
  course_id: string | null;
}

interface Appointment {
  professor_id: number;
  time_slot: string;
}

const OfficeHours: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to login if user is not authenticated
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to access Office Hours.");
      navigate("/login");
    }
  }, [navigate]);

  // State hooks for managing application data
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);

  // Fetch professor list on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/professors")
      .then((res) => res.json())
      .then((data) => {
        setProfessors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Unable to load professor data.");
        setLoading(false);
      });
  }, []);

  // Fetch already taken time slots for the selected professor and date
  useEffect(() => {
    if (selectedId && appointmentDate) {
      const dateStr = format(appointmentDate, "yyyy-MM-dd");
      fetch(`http://127.0.0.1:5000/api/appointments/${selectedId}/${dateStr}`)
        .then((res) => res.json())
        .then((data: Appointment[]) => {
          const taken = data.map((a) => a.time_slot.split(" ").slice(1).join(" "));
          setTakenSlots(taken);
        });
    }
  }, [selectedId, appointmentDate]);

  // Identify the selected professor from the list
  const selectedProfessor = professors.find((p) => p.id === selectedId);

  // Helper: Parse and map valid office hour days to time ranges
  const getValidDaysAndSlots = (hours: string | null): Record<string, [string, string][]> => {
    if (!hours) return {};
    const result: Record<string, [string, string][]> = {};
    const regex = /((Monday|Tuesday|Wednesday|Thursday|Friday)[^;]*)/gi;
    const matches = hours.match(regex);

    matches?.forEach((entry) => {
      const dayMatch = entry.match(/(Monday|Tuesday|Wednesday|Thursday|Friday)/);
      const timeMatches = [...entry.matchAll(/(\d{1,2}:\d{2})(?:\s)?(am|pm)?(?:,\s*)?(\d{1,2}:\d{2})?(?:\s)?(am|pm)?-(\d{1,2}:\d{2})(?:\s)?(am|pm)/gi)];
      if (dayMatch && timeMatches.length) {
        const day = dayMatch[1];
        const ranges: [string, string][] = [];
        timeMatches.forEach((m) => {
          const start = (m[1] + (m[2] || m[6])).toLowerCase();
          const end = (m[5] + m[6]).toLowerCase();
          ranges.push([start, end]);
        });
        result[day] = result[day] ? [...result[day], ...ranges] : ranges;
      }
    });

    return result;
  };

  // Helper: Generate 15-minute time slots between start and end
  const generateTimeSlots = (start: string, end: string): string[] => {
    const base = new Date();
    const startTime = parse(start, "h:mma", base);
    const endTime = parse(end, "h:mma", base);
    const slots: string[] = [];
    while (startTime < endTime) {
      slots.push(format(startTime, "h:mm a"));
      startTime.setMinutes(startTime.getMinutes() + 15);
    }
    return slots;
  };

  // Update available time slots based on selected date and professor
  useEffect(() => {
    if (selectedProfessor && appointmentDate) {
      const parsed = getValidDaysAndSlots(selectedProfessor.office_hours);
      const day = format(appointmentDate, "EEEE");
      const ranges = parsed[day];
      if (ranges) {
        const slots = ranges
          .flatMap(([s, e]) => generateTimeSlots(s, e))
          .sort((a, b) => parse(a, "h:mm a", new Date()).getTime() - parse(b, "h:mm a", new Date()).getTime());
        setTimeOptions(slots);
      } else {
        setTimeOptions([]);
      }
    }
  }, [appointmentDate, selectedProfessor]);

  // Handle appointment form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId || !selectedCourseId || !studentName || !studentEmail || !appointmentDate || !timeSlot || !reason) {
      alert("⚠️ Please fill all fields");
      return;
    }

    const appointment = {
      professor_id: selectedId,
      student_name: studentName,
      student_email: studentEmail,
      time_slot: `${format(appointmentDate, "yyyy-MM-dd")} ${timeSlot}`,
      reason,
      additional_notes: additionalNotes,
      course_id: selectedCourseId,
    };

    const res = await fetch("http://127.0.0.1:5000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    });

    if (res.ok) {
      alert("✅ Appointment submitted!");
      setStudentName("");
      setStudentEmail("");
      setAppointmentDate(null);
      setTimeSlot("");
      setReason("");
      setAdditionalNotes("");
      setSelectedCourseId(null);
    } else {
      alert("❌ Submission failed.");
    }
  };

  // Format professor office hour strings into readable multi-line output
  const formatProfessorOfficeHours = (hours: string | null) => {
    const parsed = getValidDaysAndSlots(hours);
    return Object.entries(parsed)
      .map(([day, slots]) =>
        `${day} ${slots.map(([s, e]) => `${s.replace(/(am|pm)/, " $1")}–${e.replace(/(am|pm)/, " $1")}`).join(", ")}`
      )
      .join("\n");
  };

  return (
    <div className="office-hours-wrapper">
      <div className="office-hours-container">
        {/* Left Column: Professor Office Info */}
        <div className="professor-info">
          <h2>Professor Office Hours</h2>
          <select value={selectedId ?? ""} onChange={(e) => setSelectedId(Number(e.target.value) || null)} required>
            <option value="">-- Select a Professor --</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>{prof.name}</option>
            ))}
          </select>
          {loading ? <p>Loading professors...</p> :
            error ? <p>{error}</p> :
              selectedProfessor ? (
                <div className="office-hours-text">
                  <p><strong>Office Location:</strong> {selectedProfessor.office}</p>
                  <p><strong>Office Hours:</strong><br />
                    {formatProfessorOfficeHours(selectedProfessor.office_hours).split("\n").map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </p>
                </div>
              ) : <p>No professor selected</p>}
        </div>

        {/* Right Column: Booking Form */}
        <div className="student-form">
          <h2>Book Appointment</h2>
          {selectedProfessor && (
            <div className="selected-professor-banner">
              Booking for <strong>{selectedProfessor.name}</strong>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
            <input type="email" placeholder="Student Email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
            <select value={selectedId ?? ""} onChange={(e) => setSelectedId(Number(e.target.value) || null)} required>
              <option value="">-- Select a Professor --</option>
              {professors.map((prof) => (
                <option key={prof.id} value={prof.id}>{prof.name}</option>
              ))}
            </select>

            {/* Course dropdown based on selected professor */}
            {selectedProfessor && (
              <select value={selectedCourseId ?? ""} onChange={(e) => setSelectedCourseId(e.target.value)} required>
                <option value="">-- Select a Course ID --</option>
                {(selectedProfessor.course_id?.split(",") || []).map((course, index) => (
                  <option key={index} value={course.trim()}>{course.trim()}</option>
                ))}
              </select>
            )}

            <div className="datepicker-wrapper">
              <DatePicker
                selected={appointmentDate}
                onChange={(date) => setAppointmentDate(date)}
                placeholderText="-- Select a date --"
                minDate={new Date()}
                filterDate={(date) => {
                  const day = format(date, "EEEE");
                  const parsed = getValidDaysAndSlots(selectedProfessor?.office_hours ?? "");
                  return parsed[day] !== undefined;
                }}
                className="custom-datepicker"
                required
              />
            </div>

            {/* Show time slots only after date is picked */}
            {appointmentDate && (
              <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                <option value="">-- Select a Time Slot --</option>
                {timeOptions.map((slot, index) => {
                  const now = new Date();
                  const selectedDateStr = format(appointmentDate, "yyyy-MM-dd");
                  const todayStr = format(now, "yyyy-MM-dd");
                  const isToday = selectedDateStr === todayStr;
                  const slotTime = parse(slot, "h:mm a", new Date());
                  const isTaken = takenSlots.includes(slot);
                  const isPast = isToday && slotTime <= now;
                  return (
                    <option key={index} value={slot} disabled={isTaken || isPast}>
                      {slot}
                    </option>
                  );
                })}
              </select>
            )}

            <select value={reason} onChange={(e) => setReason(e.target.value)} required>
              <option value="">-- Reason for appointment --</option>
              <option value="Homework Help">Homework Help</option>
              <option value="Exam Review">Exam Review</option>
              <option value="Project Discussion">Project Discussion</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              className="additional-notes"
              placeholder="Additional Notes (optional)"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
            <button type="submit">Submit Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficeHours;
