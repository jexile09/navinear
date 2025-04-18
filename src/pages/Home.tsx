import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserCheck, GraduationCap, Map, CalendarDays } from "lucide-react";
import "./Home.css";

// Carousel image paths
const images = [
  "/images/Screenshot 1.png",
  "/images/Screenshot 2.png",
  "/images/Screenshot 3.png",
  "/images/Screenshot 4.png",
  "/images/Screenshot 5.png",
  "/images/Screenshot 6.png",
];

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<{ role: string; username: string; name: string } | null>(null);

  // Auto-rotate image carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load user info from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Sync logout from Navibar
  useEffect(() => {
    const syncUser = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // Slide controls
  const prevSlide = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentIndex((i) => (i + 1) % images.length);

  return (
    <div className="home-container">
      <div className="home-card">
        {/* ========== Image Carousel ========== */}
        <div className="carousel">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
          <button className="carousel-button left" onClick={prevSlide}>‹</button>
          <button className="carousel-button right" onClick={nextSlide}>›</button>
        </div>

        {/* ========== Welcome Section ========== */}
        <div className="home-content">
          <h1 className="home-title">Welcome to NaviNear</h1>
          <p className="home-subtitle">
            Your go-to solution for seamless navigation inside UToledo's North Engineering building.
          </p>

          {/* ===== Personalized Welcome Message ===== */}
          {user?.name && (
            <h2 className="home-user-greeting">Hello, {user.name}!</h2>
          )}

          {/* ========== Conditional Buttons ========== */}
          {!user ? (
            <div className="login-buttons">
              <Link to="/login/professor" className="login-btn">
                <UserCheck className="login-icon" />
                Professor Login
              </Link>
              <Link to="/login/student" className="login-btn">
                <GraduationCap className="login-icon" />
                Student Login
              </Link>
            </div>
          ) : (
            <div className="card-buttons">
              <Link to="/maps" className="card-button">
                <Map />
                <div className="card-button-label">Explore Maps</div>
              </Link>
              {user.role === "professor" ? (
                <Link to="/professor/dashboard" className="card-button">
                  <CalendarDays />
                  <div className="card-button-label">Professor Dashboard</div>
                </Link>
              ) : (
                <Link to="/office-hours" className="card-button">
                  <CalendarDays />
                  <div className="card-button-label">Office Hours</div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
