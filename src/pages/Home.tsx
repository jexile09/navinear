// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {UserCheck, GraduationCap } from "lucide-react";
import "./Home.css";

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

  // Auto‑advance carousel every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []); // ← no images.length dependency needed

  const prevSlide = () =>
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  const nextSlide = () =>
    setCurrentIndex((i) => (i + 1) % images.length);

  return (
    <div className="home-container">
      <div className="home-card">

        {/* Carousel */}
        <div className="carousel">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="carousel-image"
          />
          <button className="carousel-button left" onClick={prevSlide}>
            ‹
          </button>
          <button className="carousel-button right" onClick={nextSlide}>
            ›
          </button>
        </div>

        {/* Content */}
        <div className="home-content">
          <h1 className="home-title">Welcome to NaviNear</h1>
          <p className="home-subtitle">
            Your go-to solution for seamless navigation inside UToledo's North
            Engineering building.
          </p>

          {/* Login Pills */}
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
        </div>
      </div>
    </div>
  );
};

export default Home;
