// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Footer from "./components/Footer";           
// import Home from "./pages/Home";                   
// import Maps from "./pages/Maps";                   
// import OfficeHours from "./pages/OfficeHours";     
// import StudentLogin from "./pages/Login/StudentLogin";   
// import ProfessorLogin from "./pages/Login/ProfessorLogin";
// import Navibar from "./components/Navibar";        
// import './App.css';                                

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen bg-[#F5F5F5] text-[#00274C]">
//         <Navibar />

//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/maps" element={<Maps />} />
//             <Route path="/office-hours" element={<OfficeHours />} />

//             {/* two separate login pages */}
//             <Route path="/login/student" element={<StudentLogin />} />
//             <Route path="/login/professor" element={<ProfessorLogin />} />

//             {/* if someone goes to `/login`, redirect them to student login by default */}
//             <Route path="/login" element={<Navigate to="/login/student" replace />} />

//             {/* catch‐all back to home */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";           
import Home from "./pages/Home";                   
import Maps from "./pages/Maps";                   
import OfficeHours from "./pages/OfficeHours";     
import StudentLogin from "./pages/Login/StudentLogin";   
import ProfessorLogin from "./pages/Login/ProfessorLogin";
import ProfessorDashboard from "./pages/ProfessorDashboard"; // 👈 ADD THIS
import Navibar from "./components/Navibar";        
import './App.css';                                

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F5F5F5] text-[#00274C]">
        <Navibar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/office-hours" element={<OfficeHours />} />

            {/* Add login and dashboard routes */}
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/professor" element={<ProfessorLogin />} />
            <Route path="/professor/dashboard" element={<ProfessorDashboard />} /> {/* 👈 HERE */}

            <Route path="/login" element={<Navigate to="/login/student" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
