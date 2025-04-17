import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./StudentLogin.css";

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordPeekTimeout = useRef<NodeJS.Timeout | null>(null);
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
        alert("✅ Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // or wherever students should land
      } else {
        alert("❌ " + (data.error || "Login failed."));
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("⚠️ Network error. Please try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

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
        <div className="login-image" />
        <div className="login-form">
          <h1 className="login-title">The University of Toledo</h1>
          <p className="login-subtitle">Sign in with your organizational account</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="login-input"
          />

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

          <button onClick={handleLogin} className="login-button">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
