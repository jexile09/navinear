// Navibar.tsx
// src/components/Navibar.tsx

import React from "react";
import { Link } from "react-router-dom";
import { ToledoColors } from "./ColorScheme";
import "./Navibar.css"; // <-- Import the CSS

const Navibar: React.FC = () => {
  return (
    <nav className="nav-container">
      <div className="nav-inner">
        {/* Left side */}
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

        {/* Right side */}
        <div className="nav-links">
          <Link to="/" style={{ color: ToledoColors.accent }}>
            Home
          </Link>
          <Link to="/maps" style={{ color: ToledoColors.accent }}>
            Maps
          </Link>
          <Link to="/office-hours" style={{ color: ToledoColors.accent }}>
            Office Hours
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navibar;
