import React from "react";
import { Link } from "react-router-dom";
import { ToledoColors } from "./ColorScheme"; // Assuming you have this

const Navibar: React.FC = () => {
  return (
    <nav
      className="bg-blue-900 text-white p-4 flex justify-between items-center"
      style={{ backgroundColor: "#00274C" }} // UToledo dark blue
    >
      <h1
        className="text-2xl font-bold"
        style={{ color: ToledoColors.secondary }}
      >
        UToledo Navigation
      </h1>
      <div>
        <Link
          className="mx-3 hover:text-yellow-400 transition duration-300"
          to="/"
        >
          Home
        </Link>
        <Link
          className="mx-3 hover:text-yellow-400 transition duration-300"
          to="/maps"
        >
          Maps
        </Link>
        <Link
          className="mx-3 hover:text-yellow-400 transition duration-300"
          to="/office-hours"
        >
          Office Hours
        </Link>
      </div>
    </nav>
  );
};

export default Navibar;
