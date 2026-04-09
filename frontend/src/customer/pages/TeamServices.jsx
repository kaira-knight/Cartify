// TeamServices.jsx
import React from "react";
import "./TeamServices.css";
import { FaTwitter, FaInstagram, FaLinkedin, FaTruck, FaHeadphones, FaCheckCircle } from "react-icons/fa";

const TeamServices = () => {
  return (
    <div className="team-services-wrapper">

      {/* ================= Team Section ================= */}
      <div className="team-section-flex">

        <div className="team-card">
          <div className="team-img">
            <img src="https://img.freepik.com/free-photo/young-bearded-man-blue-shirt-with-crossed-arms-smiling-confident_141793-37837.jpg?semt=ais_hybrid&w=740&q=80" />
          </div>
          <h3>Tom Cruise</h3>
          <p>Founder & Chairman</p>
          <div className="social-icons">
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div className="team-card">
          <div className="team-img">
            <img src="https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?semt=ais_hybrid&w=740&q=80" />
          </div>
          <h3>Emma Watson</h3>
          <p>Managing Director</p>
          <div className="social-icons">
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div className="team-card">
          <div className="team-img">
            <img src="https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?semt=ais_hybrid&w=740&q=80" />
          </div>
          <h3>Will Smith</h3>
          <p>Product Designer</p>
          <div className="social-icons">
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        <div className="team-card">
          <div className="team-img">
            <img src="https://media.istockphoto.com/id/1371553731/photo/portrait-of-a-young-businessman-using-a-headset-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=gfn9mVWijMJFNPRdzDNZExnvC6qBOkeeol9oJGpEfSM=" />
          </div>
          <h3>John Doe</h3>
          <p>Marketing Manager</p>
          <div className="social-icons">
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

      </div>

      {/* ================= Services Section ================= */}
      <div className="services-section-flex">

        <div className="service-card">
          <div className="service-icon">
            <FaTruck />
          </div>
          <h4>FREE AND FAST DELIVERY</h4>
          <p>Free delivery for all orders over $140</p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <FaHeadphones />
          </div>
          <h4>24/7 CUSTOMER SERVICE</h4>
          <p>Friendly 24/7 customer support</p>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <FaCheckCircle />
          </div>
          <h4>MONEY BACK GUARANTEE</h4>
          <p>We return money within 30 days</p>
        </div>

      </div>

    </div>
  );
};

export default TeamServices;
