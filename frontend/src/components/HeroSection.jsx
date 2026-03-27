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
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

      <div className="carousel-wrapper">

        <Slider {...settings}>

          <div>
            <div className="slide">

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
                src="https://sell.gameloot.in/wp-content/uploads/sites/4/2022/09/apple-14-pro-1tb.jpg"
                alt="iphone"
              />

            </div>
          </div>

          <div>
            <div className="slide">

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
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97"
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