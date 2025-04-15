// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";           // Footer component
import Home from "./pages/Home";                   // Home page component
import Maps from "./pages/Maps";                   // Maps page component
import OfficeHours from "./pages/OfficeHours";     // Office Hours page component
import Login from "./pages/Login";                  // Login page route
import Navibar from "./components/Navibar";        // Top navigation bar
import './App.css';                                // Global styles

function App() {
  return (
    <Router>
      {/* Root container with flex layout and styling */}
      <div className="flex flex-col min-h-screen bg-[#F5F5F5] text-[#00274C]">

        {/* Top Navigation Bar */}
        <Navibar />

        {/* Main content area, expands to fill available vertical space */}
        <main className="flex-grow">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />
            {/* Maps route */}
            <Route path="/maps" element={<Maps />} />
            {/* Office Hours route */}
            <Route path="/office-hours" element={<OfficeHours />} />
            {/* Login route */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Bottom Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
