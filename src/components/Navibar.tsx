// import React from "react";
// import { Link } from "react-router-dom";
// import { ToledoColors } from "./ColorScheme";
// import "./Navibar.css";

// const Navibar: React.FC = () => {
//   return (
//     <nav className="nav-container">
//       <div className="nav-inner">
//         {/* Logo */}
//         <div className="nav-title">
//           <h1 className="nav-logo">
//             <span style={{ color: ToledoColors.primary }}>navi</span>
//             <span style={{ color: ToledoColors.secondary }}>NE</span>
//             <span style={{ color: ToledoColors.primary }}>ar</span>
//           </h1>
//           <p className="nav-subtitle" style={{ color: ToledoColors.primary }}>
//             UToledo North Engineering Navigation
//           </p>
//         </div>

//         {/* Links only */}
//         <div className="nav-links">
//           <Link to="/" style={{ color: ToledoColors.accent }}>Home</Link>
//           <Link to="/maps" style={{ color: ToledoColors.accent }}>Maps</Link>
//           <Link to="/office-hours" style={{ color: ToledoColors.accent }}>Office Hours</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navibar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToledoColors } from "./ColorScheme";
import "./Navibar.css";

const Navibar: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isStudent = user?.role === "student";
  const isProfessor = user?.role === "professor";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="nav-container">
      <div className="nav-inner">
        {/* Logo */}
        <div className="nav-title">
          <h1 className="nav-logo">
            <span style={{ color: ToledoColors.primary }}>navi</span>
            <span style={{ color: ToledoColors.secondary }}>NE</span>
            <span style={{ color: ToledoColors.primary }}>ar</span>
          </h1>
          <p className="nav-subtitle" style={{ color: ToledoColors.primary }}>
            UToledo North Engineering Navigation
          </p>
        </div>

        {/* Conditional Links */}
        <div className="nav-links">
          <Link to="/" style={{ color: ToledoColors.accent }}>Home</Link>
          <Link to="/maps" style={{ color: ToledoColors.accent }}>Maps</Link>

          {isStudent && (
            <Link to="/office-hours" style={{ color: ToledoColors.accent }}>
              Office Hours
            </Link>
          )}

          {isProfessor && (
            <Link to="/professor/dashboard" style={{ color: ToledoColors.accent }}>
              Dashboard
            </Link>
          )}

          {(isStudent || isProfessor) && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
