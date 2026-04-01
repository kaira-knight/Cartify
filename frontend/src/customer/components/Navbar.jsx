import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Search,
  ChevronDown,
  User,
  Heart,
  ShoppingCart,
  Briefcase,
  XCircle,
  Star,
  LogOut,
  Menu,
} from "lucide-react";

import "./Navbar.css";

const Navbar = ({ user }) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <a href="/shop" className="shop-now-link">
              ShopNow
            </a>
          </p>

          <div className="language-selector">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="nav-content">
          <div className="nav-logo">Exclusive</div>

          {/* Mobile Menu Icon */}
          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <Menu size={28} />
          </div>

          {/* Navigation Links */}
          <ul
            className={`nav-links ${
              isMobileMenuOpen ? "nav-links-mobile" : ""
            }`}> 
           <li> <NavLink to="/" end className={({ isActive }) => isActive ? "border-b-2 border-red-500 pb-1" : "" } > Home </NavLink> </li> 
           <li> <NavLink to="/contact" className={({ isActive }) => isActive ? "border-b-2 border-red-500 pb-1" : "" } > Contact </NavLink> </li>
            <li> <NavLink to="/about" className={({ isActive }) => isActive ? "border-b-2 border-red-500 pb-1" : "" } > About </NavLink> </li> 
            <li> <NavLink to="/signup" className={({ isActive }) => isActive ? "border-b-2 border-red-500 pb-1" : "" } > Sign Up </NavLink> </li> 
           </ul>
          

          {/* Actions */}
          <div className="nav-actions">
            {/* Search */}
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="search-input"
              />
              <Search size={18} />
            </div>

            {/* User Icons */}
            {user && (
              <div className="user-icons">
                <a href="/wishlist">
                  <Heart size={22} />
                </a>

                <a href="/cart" className="cart-icon">
                  <ShoppingCart size={22} />
                  <span className="cart-count">2</span>
                </a>

                <div
                  className="account-container"
                  onClick={toggleAccountMenu}
                >
                  <User size={22} />

                  {isAccountMenuOpen && (
                    <div className="account-menu">
                      <a href="/account" className="account-item">
                        <User size={16} />
                        Manage My Account
                      </a>

                      <a href="/orders" className="account-item">
                        <Briefcase size={16} />
                        My Order
                      </a>

                      <a href="/cancellations" className="account-item">
                        <XCircle size={16} />
                        My Cancellations
                      </a>

                      <a href="/reviews" className="account-item">
                        <Star size={16} />
                        My Reviews
                      </a>

                      <a href="/logout" className="account-item">
                        <LogOut size={16} />
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;