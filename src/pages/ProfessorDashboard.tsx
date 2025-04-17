// import { useEffect, useState } from "react";
// import "./ProfessorDashboard.css";

// interface Appointment {
//   student_name: string;
//   student_email: string;
//   time_slot: string;
//   reason: string;
// }

// export default function ProfessorDashboard() {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}");

//     if (user && user.id) {
//       fetch(`http://localhost:5000/api/appointments/professor/${user.id}`)
//         .then((res) => res.json())
//         .then((data) => setAppointments(data))
//         .catch((err) => console.error("Error fetching appointments:", err));
//     }
//   }, []);

//   return (
//     <div className="dashboard">
//       <h1>Professor Dashboard</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Student Name</th>
//             <th>Email</th>
//             <th>Time</th>
//             <th>Reason</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appt, index) => (
//             <tr key={index}>
//               <td>{appt.student_name}</td>
//               <td>{appt.student_email}</td>
//               <td>{appt.time_slot}</td>
//               <td>{appt.reason}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import "./ProfessorDashboard.css";

interface Appointment {
  student_name: string;
  student_email: string;
  time_slot: string;
  reason: string;
}

export default function ProfessorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user && user.id) {
      fetch(`http://localhost:5000/api/appointments/professor/${user.id}`)
        .then((res) => res.json())
        .then((data) => setAppointments(data))
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
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={index}>
              <td>{appt.student_name}</td>
              <td>{appt.student_email}</td>
              <td>{appt.time_slot}</td>
              <td>{appt.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
