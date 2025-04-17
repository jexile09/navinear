import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./ProfessorLogin.css";

const ProfessorLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const peekTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

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
        // Tag role so Navibar can pick it up if needed
        localStorage.setItem("user", JSON.stringify({ ...data.user, role: "professor" }));
        navigate("/professor/dashboard"); // adjust to your professor dashboard route
      } else {
        alert("❌ " + (data.error || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("⚠️ Network error. Please try again.");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(v => !v);
    if (peekTimeout.current) clearTimeout(peekTimeout.current);
    peekTimeout.current = setTimeout(() => setShowPassword(false), 3000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-image" />
        <div className="login-form">
          <h1 className="login-title">The University of Toledo</h1>
          <p className="login-subtitle">Sign in with your organizational account</p>

          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={onKeyDown}
          />

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

          <button onClick={handleLogin} className="login-button">
            Sign in as Professor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessorLogin;
