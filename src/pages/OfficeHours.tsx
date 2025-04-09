import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
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

interface Appointment {
  professor_id: number;
  time_slot: string;
}

const OfficeHours: React.FC = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [reason, setReason] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);

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

  useEffect(() => {
    if (selectedId && appointmentDate) {
      const dateStr = format(appointmentDate, "yyyy-MM-dd");
      fetch(`http://127.0.0.1:5000/api/appointments/${selectedId}/${dateStr}`)
        .then(res => res.json())
        .then((data: Appointment[]) => {
          const taken = data.map(a => {
            const timePart = a.time_slot.split(" ")[1]; // e.g., "13:30"
            const parsed = parse(timePart, "H:mm", new Date()); // parse as 24h time
            return format(parsed, "h:mm a"); // convert to same format as timeOptions
          });
          setTakenSlots(taken);
        });
    }
  }, [selectedId, appointmentDate]);  

  const selectedProfessor = professors.find((p) => p.id === selectedId);

  const getValidDaysAndSlots = (hours: string | null): Record<string, [string, string][]> => {
    if (!hours) return {};
    const result: Record<string, [string, string][]> = {};
    const regex = /((Monday|Tuesday|Wednesday|Thursday|Friday)[^;]*)/gi;
    const matches = hours.match(regex);

    matches?.forEach(entry => {
      const dayMatch = entry.match(/(Monday|Tuesday|Wednesday|Thursday|Friday)/);
      const timeMatches = [...entry.matchAll(/(\d{1,2}:\d{2})(?:\s)?(am|pm)?(?:,\s*)?(\d{1,2}:\d{2})?(?:\s)?(am|pm)?-(\d{1,2}:\d{2})(?:\s)?(am|pm)/gi)];

      if (dayMatch && timeMatches.length) {
        const day = dayMatch[1];
        const ranges: [string, string][] = [];

        timeMatches.forEach(m => {
          const start = (m[1] + (m[2] || m[6])).toLowerCase();
          const end = (m[5] + m[6]).toLowerCase();
          ranges.push([start, end]);
        });

        if (result[day]) {
          result[day].push(...ranges);
        } else {
          result[day] = ranges;
        }
      }
    });

    return result;
  };

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

  useEffect(() => {
    if (selectedProfessor && appointmentDate) {
      const parsed = getValidDaysAndSlots(selectedProfessor.office_hours);
      const day = format(appointmentDate, "EEEE");
      const ranges = parsed[day];
      if (ranges) {
        const slots = ranges
          .flatMap(([s, e]) => generateTimeSlots(s, e))
          .filter(slot => !takenSlots.includes(slot))
          .sort((a, b) => {
            const base = new Date();
            return parse(a, "h:mm a", base).getTime() - parse(b, "h:mm a", base).getTime();
          });
        setTimeOptions(slots);
      } else {
        setTimeOptions([]);
      }
    }
  }, [appointmentDate, selectedProfessor, takenSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId || !studentName || !studentEmail || !appointmentDate || !timeSlot || !reason) {
      alert("Please fill all fields");
      return;
    }

    const appointment = {
      professor_id: selectedId,
      student_name: studentName,
      student_email: studentEmail,
      time_slot: `${format(appointmentDate, "yyyy-MM-dd")} ${timeSlot}`,
      reason
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
      setAppointmentDate(null);
      setTimeSlot("");
      setReason("");
    } else {
      alert("Submission failed.");
    }
  };

  const formatProfessorOfficeHours = (hours: string | null) => {
    const parsed = getValidDaysAndSlots(hours);
    return Object.entries(parsed)
      .map(([day, slots]) => `${day} ${slots.map(([s, e]) => `${s.replace(/(am|pm)/, ' $1')}–${e.replace(/(am|pm)/, ' $1')}`).join(", ")}`)
      .join("\n");
  };

  return (
    <div className="office-hours-wrapper">
      <div className="office-hours-container">
        <div className="professor-info">
          <h2>Professor Office Hours</h2>
          <select
            value={selectedId ?? ""}
            onChange={(e) => setSelectedId(Number(e.target.value) || null)}
          >
            <option value="">-- Select a Professor --</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>{prof.name}</option>
            ))}
          </select>

          {loading ? <p className="text-gray-500">Loading professors...</p> :
            error ? <p className="text-red-500">{error}</p> :
              selectedProfessor ? (
                <div className="office-hours-text">
                  <p><strong>Office Location:</strong> {selectedProfessor.office}</p>
                  {selectedProfessor.office_hours ? (
                    <p><strong>Office Hours:</strong><br />
                      {formatProfessorOfficeHours(selectedProfessor.office_hours)
                        .split("\n")
                        .map((line, i) => <span key={i}>{line}<br /></span>)}
                    </p>
                  ) : (
                    <p>No office hours available</p>
                  )}
                </div>
              ) : <p>No professor selected</p>}
        </div>

        <div className="student-form">
          <h2>Book Appointment</h2>
          {selectedProfessor && (
            <div className="selected-professor-banner">
              Booking for <strong>{selectedProfessor.name}</strong>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Student Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
            <select
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(Number(e.target.value) || null)}
              required
            >
              <option value="">-- Select a Professor --</option>
              {professors.map((prof) => (
                <option key={prof.id} value={prof.id}>{prof.name}</option>
              ))}
            </select>
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

            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            >
              <option value="">-- Select a Time Slot --</option>
              {timeOptions.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">-- Reason for appointment --</option>
              <option value="Homework Help">Homework Help</option>
              <option value="Exam Review">Exam Review</option>
              <option value="Project Discussion">Project Discussion</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit">Submit Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfficeHours;
