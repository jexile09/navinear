// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ToledoColors } from "./ColorScheme"; // Import custom color scheme

// Header component for top navigation bar
const Header: React.FC = () => {
  return (
    // Header section with padding and shadow, using custom background and text colors
    <header
      className="py-4 shadow-md"
      style={{
        backgroundColor: ToledoColors.primary,
        color: ToledoColors.secondary,
      }}
    >
      {/* Navigation bar container with horizontal layout */}
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo or title */}
        <div className="text-2xl font-bold">UT Indoor Navigation</div>

        {/* Navigation links */}
        <ul className="flex space-x-6">
          {/* Home Link */}
          <li>
            <Link
              to="/"
              className="hover:text-yellow-200 transition duration-300"
              style={{ color: ToledoColors.secondary }}
            >
              Home
            </Link>
          </li>

          {/* Maps Link */}
          <li>
            <Link
              to="/maps"
              className="hover:text-yellow-200 transition duration-300"
              style={{ color: ToledoColors.secondary }}
            >
              Maps
            </Link>
          </li>

          {/* Office Hours Link */}
          <li>
            <Link
              to="/office-hours"
              className="hover:text-yellow-200 transition duration-300"
              style={{ color: ToledoColors.secondary }}
            >
              Office Hours
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; // Export Header for use in layout or other components
