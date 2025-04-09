import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const images = [
  "/images/Screenshot 1.png",
  "/images/Screenshot 2.png",
  "/images/Screenshot 3.png",
  "/images/Screenshot 4.png",
  "/images/Screenshot 5.png",
  "/images/Screenshot 6.png",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Optional: Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
<div className="page-container">
  <div className="home-card">
    {/* Image Carousel */}
    <div className="carousel">
      <img src={images[currentIndex]} alt="Slide" className="carousel-image" />
      <button className="carousel-button left" onClick={prevSlide}>‹</button>
      <button className="carousel-button right" onClick={nextSlide}>›</button>
    </div>

    {/* Text + Buttons */}
    <div className="home-content">
      <h1 className="home-title">Welcome to NaviNear</h1>
      <p className="home-subtitle">
        Your go-to solution for seamless navigation inside UToledo's North Engineering building.
      </p>
      <div className="home-buttons">
        <Link to="/maps">
          <button className="maps-btn">Explore Maps</button>
        </Link>
        <Link to="/office-hours">
          <button className="hours-btn">Office Hours</button>
        </Link>
      </div>
    </div>
  </div>
</div>
  );
}
