import React, { useEffect, useState } from "react";
import "./ProductBanner.css";

const ProductBanner = ({
  productImage,
  targetDate = "2026-12-31T23:59:59"
}) => {

  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / 1000 / 60) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      )
    };
  };

  const [timeLeft, setTimeLeft] =
    useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="parent">
    <div className="banner">

      {/* LEFT SIDE */}
      <div className="banner-left">

        <p className="category">
          Categories
        </p>

        <h1 className="title">
          Enhance Your <br />
          Music Experience
        </h1>

        <div className="timer">

          <div className="circle">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>

          <div className="circle">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>

          <div className="circle">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>

          <div className="circle">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>

        </div>

        <button className="buy-btn">
          Buy Now!
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="banner-right">

        <img
          src="jblspeaker.png"
          alt="product"
        />

      </div>

    </div>
    </div>
  );
};

export default ProductBanner;