import React from 'react';
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* Exclusive Section */}
        <div className="footer-section">
          <h2 className="footer-logo">Exclusive</h2>
          <h3 className="section-title">Subscribe</h3>
          <p className="text-small">Get 10% off your first order</p>
          <div className="email-input-wrapper">
            <input type="email" placeholder="Enter your email" />
            <Send size={18} className="send-icon" />
          </div>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3 className="section-title">Support</h3>
          <p className="text-small">111 Bijoy sarani, Dhaka,<br /> DH 1515, Bangladesh.</p>
          <p className="text-small">exclusive@gmail.com</p>
          <p className="text-small">+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="footer-section">
          <h3 className="section-title">Account</h3>
          <ul className="footer-links">
            <li><a href="#">My Account</a></li>
            <li><a href="#">Login / Register</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div className="footer-section">
          <h3 className="section-title">Quick Link</h3>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Download App Section */}
        <div className="footer-section">
          <h3 className="section-title">Download App</h3>
          <p className="promo-text">Save $3 with App New User Only</p>
          <div className="download-wrapper">
            <div className="qr-placeholder">
              {/* Actual QR Image would go here */}
              <div className="qr-box">QR CODE</div>
            </div>
            <div className="store-buttons">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
            </div>
          </div>
          <div className="social-icons">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
            <Linkedin size={20} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;