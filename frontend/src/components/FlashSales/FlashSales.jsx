import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard.jsx";
import "./FlashSales.css";
import ProductsData from "./Products.json"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const FlashSales = () => {

  const [time, setTime] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(prev => {

        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;

          if (minutes > 0) minutes--;
          else {
            minutes = 59;

            if (hours > 0) hours--;
            else {
              hours = 23;

              if (days > 0) days--;
            }
          }
        }

        return { days, hours, minutes, seconds };

      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  }

  const settings = {

    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]

  };

  return (
    <div className="flash-section">

 <div className="flash-header">

        <div>

          <p className="today">
            Today's
          </p>

          <h2>
            Flash Sales
          </h2>

        </div>

        {/* Timer */}

        <div className="timer">

          <div>
            <span>
              {time.days}
            </span>
            <p>Days</p>
          </div>

          <div>
            <span>
              {time.hours}
            </span>
            <p>Hours</p>
          </div>

          <div>
            <span>
              {time.minutes}
            </span>
            <p>Minutes</p>
          </div>

          <div>
            <span>
              {time.seconds}
            </span>
            <p>Seconds</p>
          </div>

        </div>

      </div>



      <Slider {...settings}>

        {ProductsData.products.map(product => (

          <div key={product.id}>
            <ProductCard product={product} />
          </div>

        ))}

      </Slider>


      <div className="view-all">
        <button className="view-btn">View All Products</button>
      </div>
      

    </div>
  );
};

export default FlashSales;