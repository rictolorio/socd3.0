import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import img1 from "../assets/slider/img1.jpg";
import img2 from "../assets/slider/img2.jpg";
import img3 from "../assets/slider/img3.jpg";
import img4 from "../assets/slider/img4.jpg";
import img5 from "../assets/slider/img5.jpg";

import logo from "../assets/slider/oroqlogo.png"; // big logo

const images = [img1, img2, img3, img4, img5];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle parallax tilt
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = currentTarget;

    // Get mouse position relative to image
    const x = clientX - offsetLeft;
    const y = clientY - offsetTop;

    // Normalize to range [-1, 1]
    const rotateX = ((y / offsetHeight) - 0.5) * -20; // up/down tilt
    const rotateY = ((x / offsetWidth) - 0.5) * 20;   // left/right tilt

    setTiltStyle({
      transform: `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "scale(1) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
              style={tiltStyle}
            />
          </div>

          {/* Overlay (ignores pointer so hover works) */}
          <div className="absolute top-0 left-[36px] right-[36px] bottom-[36px] bg-blue-700/50 rounded-lg shadow-lg pointer-events-none"></div>
        </div>
      ))}

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold mb-2 drop-shadow-lg">
          Office of the City Mayor
        </h2>
        <h3 className="text-xl lg:text-4xl md:text-2xl mb-6 drop-shadow-lg">
          Special Operations and Concerns Division
        </h3>

        {/* Big Logo */}
        <img src={logo} alt="SOCD Logo" className="w-48 md:w-64 mb-6 drop-shadow-xl" />

        <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold mb-4 drop-shadow-lg">
          DRIVER SYSTEM PORTAL
        </h1>
        <p className="text-base lg:text-2xl md:text-lg max-w-3xl mb-8 drop-shadow">
          A front line government agency showcasing fast and efficient public service
          for a progressive land transport sector
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-6">
          <Link to="/register" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
            REGISTER NOW
          </Link>
          <button className="px-8 py-3 border border-white hover:bg-white/50 text-white font-bold rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
