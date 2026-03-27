import React from "react";
import Slider from "react-slick";
import "./HeroSection.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false
  };

  return (
    <div className="hero-container">

      {/* LEFT SIDEBAR */}

      <div className="sidebar">

        <p>Woman’s Fashion</p>
        <p>Men’s Fashion</p>
        <p>Electronics</p>
        <p>Home & Lifestyle</p>
        <p>Medicine</p>
        <p>Sports & Outdoor</p>
        <p>Baby’s & Toys</p>
        <p>Groceries & Pets</p>
        <p>Health & Beauty</p>

      </div>

      {/* RIGHT CAROUSEL */}

      <div className="carousel">

        <Slider {...settings}>

          <div className="slide">
            <div className="slide-content">

              <div className="text">

                <h4>iPhone 14 Series</h4>

                <h1>
                  Up to 10% <br />
                  off Voucher
                </h1>

                <button>
                  Shop Now →
                </button>

              </div>

              <img
                src="https://i.imgur.com/fHyEMsl.jpg"
                alt="iphone"
              />

            </div>
          </div>

          <div className="slide">
            <div className="slide-content">

              <div className="text">

                <h4>Samsung Galaxy</h4>

                <h1>
                  Big Sale <br />
                  20% OFF
                </h1>

                <button>
                  Shop Now →
                </button>

              </div>

              <img
                src="https://i.imgur.com/3ZQ3Z6H.png"
                alt="phone"
              />

            </div>
          </div>

        </Slider>

      </div>

    </div>
  );
};

export default HeroSection;