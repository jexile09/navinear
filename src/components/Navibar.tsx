// // src/components/Navibar.tsx
// import React from "react";
// import { Link } from "react-router-dom"; // For client-side routing
// import { ToledoColors } from "./ColorScheme"; // UToledo color palette
// import "./Navibar.css"; // Component-specific CSS

// // Navigation bar component
// const Navibar: React.FC = () => {
//   return (
//     <nav className="nav-container">
//       <div className="nav-inner">
//         {/* Left side: Logo and subtitle */}
//         <div className="nav-title">
//           <h1 className="nav-logo">
//             {/* Highlight "navi", "NE", and "ar" using UToledo color scheme */}
//             <span style={{ color: ToledoColors.primary }}>navi</span>
//             <span style={{ color: ToledoColors.secondary }}>NE</span>
//             <span style={{ color: ToledoColors.primary }}>ar</span>
//           </h1>
//           {/* Small subtitle below logo */}
//           <p className="nav-subtitle" style={{ color: ToledoColors.primary }}>
//             UToledo North Engineering Navigation
//           </p>
//         </div>

//         {/* Right side: Navigation links */}
//         <div className="nav-links">
//           {/* Link to home page */}
//           <Link to="/" style={{ color: ToledoColors.accent }}>
//             Home
//           </Link>

//           {/* Link to map page */}
//           <Link to="/maps" style={{ color: ToledoColors.accent }}>
//             Maps
//           </Link>

//           {/* Link to office hours page */}
//           <Link to="/office-hours" style={{ color: ToledoColors.accent }}>
//             Office Hours
//           </Link>

//           {/* Box-style Login button beside Office Hours */}
//           <Link to="/login" className="login-box">
//             Login
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navibar; // Export to be used in App layout

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToledoColors } from "./ColorScheme";
import "./Navibar.css";

const Navibar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };
  
    // Listen for login/logout
    window.addEventListener("storage", handleStorageChange);
  
    // Initial check
    handleStorageChange();
  
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
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

        {/* Nav Links */}
        <div className="nav-links">
          <Link to="/" style={{ color: ToledoColors.accent }}>Home</Link>
          <Link to="/maps" style={{ color: ToledoColors.accent }}>Maps</Link>
          <Link to="/office-hours" style={{ color: ToledoColors.accent }}>Office Hours</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="login-box">Logout</button>
          ) : (
            <Link to="/login" className="login-box">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
