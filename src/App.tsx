// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Maps from "./pages/Maps";
import OfficeHours from "./pages/OfficeHours";
import StudentLogin from "./pages/Login/StudentLogin";
import ProfessorLogin from "./pages/Login/ProfessorLogin";
import ProfessorDashboard from "./pages/ProfessorDashboard"; // Import professor dashboard
import Navibar from "./components/Navibar";
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F5F5F5] text-[#00274C]">
        <Navibar />

        {/* Main content section */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/maps" element={<Maps />} />

            {/* Student-only route */}
            <Route path="/office-hours" element={<OfficeHours />} />

            {/* Authentication pages */}
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/professor" element={<ProfessorLogin />} />

            {/* Professor-only dashboard */}
            <Route path="/professor/dashboard" element={<ProfessorDashboard />} />

            {/* Redirect /login to student login by default */}
            <Route path="/login" element={<Navigate to="/login/student" replace />} />

            {/* Catch-all route to redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
