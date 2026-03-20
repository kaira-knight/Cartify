import React from 'react';
import {Link, NavLink } from 'react-router-dom'; // Import Link from react-router-dom
import { Search, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="header-container">
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
            <Link to="/shop" className="shop-now-link">ShopNow</Link>
          </p>
          <div className="language-selector">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-nav">
        <div className="nav-content">
          <h1 className="nav-logo">Exclusive</h1>
          
          <ul className="nav-links">
  <li>
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        isActive ? "border-b-2 border-red-500 pb-1" : ""
      }
    >
      Home
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/contact"
      className={({ isActive }) =>
        isActive ? "border-b-2 border-red-500 pb-1" : ""
      }
    >
      Contact
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/about"
      className={({ isActive }) =>
        isActive ? "border-b-2 border-red-500 pb-1" : ""
      } 
    >
      About
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/signup"
      className={({ isActive }) =>
        isActive ? "border-b-2 border-red-500 pb-1" : ""
      }
    >
      Sign Up
    </NavLink>
  </li>
</ul>

          <div className="nav-actions">
            <div className="search-wrapper">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="search-input"
              />
              <Search size={18} className="search-icon" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;