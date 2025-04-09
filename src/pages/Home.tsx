/*import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <div className="w-full max-w-3xl p-6 text-center bg-blue-800 shadow-lg rounded-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Welcome to NaviNear
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Your go-to solution for seamless navigation inside UToledo's North
          Engineering building.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/maps">
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-500">
              Explore Maps
            </button>
          </Link>
          <Link to="/office-hours">
            <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300">
              Office Hours
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
*/
/*
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="page-container">
      <div className="content-box">
        <h1 className="heading">Welcome to NaviNear</h1>
        <p className="subtext">
          Your go-to solution for seamless navigation inside UToledo's North
          Engineering building.
        </p>
        <div className="button-group">
          <Link to="/maps">
            <button className="btn-yellow">Explore Maps</button>
          </Link>
          <Link to="/office-hours">
            <button className="btn-yellow">Office Hours</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

*/

/*
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white">
      <div className="w-full max-w-3xl p-6 text-center bg-blue-800 shadow-lg rounded-2xl relative overflow-hidden">
        {/* Slideshow *//*}
        <div className="carousel">
          <img src={images[currentIndex]} alt="Slide" className="carousel-image" />
          <button className="carousel-button left" onClick={prevSlide}>‹</button>
          <button className="carousel-button right" onClick={nextSlide}>›</button>
        </div>

        {/* Content *//*}
        <h1 className="text-4xl font-bold text-yellow-400 mt-4 mb-4">
          Welcome to NaviNear
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Your go-to solution for seamless navigation inside UToledo's North Engineering building.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link to="/maps">
            <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-500">
              Explore Maps
            </button>
          </Link>
          <Link to="/office-hours">
            <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-gray-300">
              Office Hours
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
*/
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