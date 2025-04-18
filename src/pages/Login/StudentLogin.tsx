// src/pages/Login/StudentLogin.tsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Icons for toggling password visibility
import "./StudentLogin.css"; // Styles for the login page

const StudentLogin: React.FC = () => {
  // State hooks for form input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Controls whether the password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  // Reference to hold timeout ID for auto-hiding password
  const passwordPeekTimeout = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate(); // Navigation hook for redirection after login

  // Function to handle login submission
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        credentials: "include", // Needed for cookies/session if used
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // Send login credentials
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify({ ...data.user, role: "student" }));
        navigate("/"); // Redirect to homepage or student-specific page
      } else {
        alert("❌ " + (data.error || "Login failed.")); // Display error
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("⚠️ Network error. Please try again.");
    }
  };

  // Submit login on pressing the Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  // Temporarily show password for 3 seconds
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    if (passwordPeekTimeout.current) {
      clearTimeout(passwordPeekTimeout.current);
    }
    passwordPeekTimeout.current = setTimeout(() => setShowPassword(false), 3000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left image panel */}
        <div className="login-image" />

        {/* Right login form panel */}
        <div className="login-form">
          <h1 className="login-title">The University of Toledo</h1>
          <p className="login-subtitle">Sign in with your organizational account</p>

          {/* Username input field */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="login-input"
          />

          {/* Password input with visibility toggle */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="login-input password-input"
            />
            <span className="toggle-eye" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Login button */}
          <button onClick={handleLogin} className="login-button">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
