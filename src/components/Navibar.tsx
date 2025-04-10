// src/components/Navibar.tsx
import React from "react";
import { Link } from "react-router-dom"; // Comes from react-router-dom, used to navigate between pages without refreshing the browser
import { ToledoColors } from "./ColorScheme"; // Import UToledo color scheme
import "./Navibar.css"; // Import component-specific CSS

// Navigation bar component
const Navibar: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-inner">
        {/* Left side: Logo and subtitle */}
        <div className="nav-title">
          <h1 className="nav-logo">
            {/* Stylized logo text using university color scheme */}
            <span style={{ color: ToledoColors.primary }}>navi</span>
            <span style={{ color: ToledoColors.secondary }}>NE</span>
            <span style={{ color: ToledoColors.primary }}>ar</span>
          </h1>
          {/* Subtitle below the logo */}
          <p className="nav-subtitle" style={{ color: ToledoColors.primary }}>
            UToledo North Engineering Navigation
          </p>
        </div>

        {/* Right side: Navigation links */}
        <div className="nav-links">
          {/* Route to Home page */}
          <Link to="/" style={{ color: ToledoColors.accent }}>
            Home
          </Link>
          {/* Route to Maps page */}
          <Link to="/maps" style={{ color: ToledoColors.accent }}>
            Maps
          </Link>
          {/* Route to Office Hours page */}
          <Link to="/office-hours" style={{ color: ToledoColors.accent }}>
            Office Hours
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navibar; // Export component for use in layout
