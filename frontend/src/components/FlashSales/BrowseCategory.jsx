import React, { useState } from "react";
import {
  FaMobileAlt,
  FaDesktop,
  FaClock,
  FaCamera,
  FaHeadphones,
  FaGamepad,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";

import "./browseCategory.css";

const categories = [
  { name: "Phones", icon: <FaMobileAlt /> },
  { name: "Computers", icon: <FaDesktop /> },
  { name: "SmartWatch", icon: <FaClock /> },
  { name: "Camera", icon: <FaCamera /> },
  { name: "HeadPhones", icon: <FaHeadphones /> },
  { name: "Gaming", icon: <FaGamepad /> }
];

const visibleItems = 4; // how many cards visible

const BrowseCategory = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nextSlide = () => {
    if (startIndex < categories.length - visibleItems) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="category-container">

      <div className="category-header">

        <div>
          <span className="category-label">
            Categories
          </span>

          <h2>
            Browse By Category
          </h2>
        </div>

        <div className="arrows">

          <button onClick={prevSlide}>
            <FaArrowLeft />
          </button>

          <button onClick={nextSlide}>
            <FaArrowRight />
          </button>

        </div>

      </div>

      <div className="carousel-wrapper">

        <div
          className="category-slider"
          style={{
            transform: `translateX(-${startIndex * 190}px)`
          }}
        >
          {categories.map((item, index) => (
            <div key={index} className="category-card">

              <div className="icon">
                {item.icon}
              </div>

              <p>
                {item.name}
              </p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default BrowseCategory;