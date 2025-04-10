// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the associated CSS styles

// Array of image paths used in the carousel
const images = [
  "/images/Screenshot 1.png",
  "/images/Screenshot 2.png",
  "/images/Screenshot 3.png",
  "/images/Screenshot 4.png",
  "/images/Screenshot 5.png",
  "/images/Screenshot 6.png",
];

// Main Home component
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index

  // Move to next image (wraps to first if at the end)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to previous image (wraps to last if at the beginning)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide to the next image every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="page-container">
      <div className="home-card">

        {/* Image Carousel */}
        <div className="carousel">
          <img src={images[currentIndex]} alt="Slide" className="carousel-image" />
          {/* Previous and Next buttons */}
          <button className="carousel-button left" onClick={prevSlide}>‹</button>
          <button className="carousel-button right" onClick={nextSlide}>›</button>
        </div>

        {/* Text content and navigation buttons */}
        <div className="home-content">
          <h1 className="home-title">Welcome to NaviNear</h1>
          <p className="home-subtitle">
            Your go-to solution for seamless navigation inside UToledo's North Engineering building.
          </p>

          {/* Call-to-action buttons */}
          <div className="home-buttons">
            {/* Navigate to Maps page */}
            <Link to="/maps">
              <button className="maps-btn">Explore Maps</button>
            </Link>

            {/* Navigate to Office Hours page */}
            <Link to="/office-hours">
              <button className="hours-btn">Office Hours</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
