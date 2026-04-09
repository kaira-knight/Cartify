// About.jsx
import React from "react";
import "./About.css";
import { FaStore, FaDollarSign, FaShoppingBag, FaMoneyBill } from "react-icons/fa";
import TeamServices from "./TeamServices";

const About = () => {
  return (
    <>
    <div className="about-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">Home / About</div>

      {/* Story Section */}
      <div className="story-section">
        <div className="story-text">
          <h1>Our Story</h1>
          <p>
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by
            wide range of tailored marketing, data and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 millions
            customers across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>

        <div className="story-image">
          <img
            src="about.png" // place your image in public/images folder
            alt="About"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <FaStore className="icon" />
          <h2>10.5k</h2>
          <p>Sellers active our site</p>
        </div>

        <div className="stat-card highlight">
          <FaDollarSign className="icon" />
          <h2>33k</h2>
          <p>Monthly Product Sale</p>
        </div>

        <div className="stat-card">
          <FaShoppingBag className="icon" />
          <h2>45.5k</h2>
          <p>Customer active in our site</p>
        </div>

        <div className="stat-card">
          <FaMoneyBill className="icon" />
          <h2>25k</h2>
          <p>Annual gross sale in our site</p>
        </div>
      </div>
    </div>
    <TeamServices/>
    </>
  );
};

export default About;


