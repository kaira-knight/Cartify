import React from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      {/* Top Black Bar */}
      <div className="topbar">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span>ShopNow</span>
        </p>

        <div className="lang">
          <span>English</span>
          <FaChevronDown />
        </div>
      </div>

      {/* Main White Navbar */}
      <div className="navbar">
        <h2 className="logo">Exclusive</h2>

        <ul className="menu">
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
          <li>Sign Up</li>
        </ul>

        <div className="nav-right">
          <div className="search-box">
            <input type="text" placeholder="What are you looking for?" />
            <FaSearch />
          </div>

          <FaHeart className="icon" />
          <FaShoppingCart className="icon" />
        </div>
      </div>
    </>
  );
};

export default Navbar;