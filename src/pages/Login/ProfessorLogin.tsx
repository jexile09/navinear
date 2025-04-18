// src/pages/Login/ProfessorLogin.tsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";           // Eye icons for password visibility toggle
import "./ProfessorLogin.css";                        // CSS for styling

const ProfessorLogin: React.FC = () => {
  // State variables for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Ref for auto-hiding password after timeout
  const peekTimeout = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate(); // Navigation hook for redirecting

  // Handles the login request to backend
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Professor login successful!");
        // Save user to localStorage with professor role
        localStorage.setItem("user", JSON.stringify({ ...data.user, role: "professor" }));
        navigate("/"); // Redirect to homepage or professor-specific page
      } else {
        alert("❌ " + (data.error || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("⚠️ Network error. Please try again.");
    }
  };

  // Trigger login on Enter key
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  // Toggles password visibility temporarily
  const togglePasswordVisibility = () => {
    setShowPassword(v => !v);
    if (peekTimeout.current) clearTimeout(peekTimeout.current);
    peekTimeout.current = setTimeout(() => setShowPassword(false), 3000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Left side image */}
        <div className="login-image" />

        {/* Right side form */}
        <div className="login-form">
          <h1 className="login-title">The University of Toledo</h1>
          <p className="login-subtitle">Sign in with your organizational account</p>

          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={onKeyDown}
          />

          {/* Password input + eye icon */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="login-input password-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <span className="toggle-eye" onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Submit button */}
          <button onClick={handleLogin} className="login-button">
            Sign in as Professor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorLogin;
