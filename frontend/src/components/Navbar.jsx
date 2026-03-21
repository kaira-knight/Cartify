// import React from 'react';
// import {Link, NavLink } from 'react-router-dom'; // Import Link from react-router-dom
// import { Search, ChevronDown } from 'lucide-react';
// import './Navbar.css';

// const Navbar = () => {
//   return (
//     <header className="header-container">
//       {/* Top Announcement Bar */}
//       <div className="top-bar">
//         <div className="top-bar-content">
//           <p>
//             Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
//             <Link to="/shop" className="shop-now-link">ShopNow</Link>
//           </p>
//           <div className="language-selector">
//             <span>English</span>
//             <ChevronDown size={14} />
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation Bar */}
//       <nav className="main-nav">
//         <div className="nav-content">
//           <h1 className="nav-logo">Exclusive</h1>
          
//           <ul className="nav-links">
//   <li>
//     <NavLink
//       to="/"
//       end
//       className={({ isActive }) =>
//         isActive ? "border-b-2 border-red-500 pb-1" : ""
//       }
//     >
//       Home
//     </NavLink>
//   </li>

//   <li>
//     <NavLink
//       to="/contact"
//       className={({ isActive }) =>
//         isActive ? "border-b-2 border-red-500 pb-1" : ""
//       }
//     >
//       Contact
//     </NavLink>
//   </li>

//   <li>
//     <NavLink
//       to="/about"
//       className={({ isActive }) =>
//         isActive ? "border-b-2 border-red-500 pb-1" : ""
//       } 
//     >
//       About
//     </NavLink>
//   </li>

//   <li>
//     <NavLink
//       to="/signup"
//       className={({ isActive }) =>
//         isActive ? "border-b-2 border-red-500 pb-1" : ""
//       }
//     >
//       Sign Up
//     </NavLink>
//   </li>
// </ul>

//           <div className="nav-actions">
//             <div className="search-wrapper">
//               <input 
//                 type="text" 
//                 placeholder="What are you looking for?" 
//                 className="search-input"
//               />
//               <Search size={18} className="search-icon" />
//             </div>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;







import React, { useState } from 'react';
 import {Link, NavLink } from 'react-router-dom'; // Import Link from react-router-dom
import { Search, ChevronDown, User, Heart, ShoppingCart, Briefcase, XCircle, Star, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user }) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  return (
    <header className="header-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! 
            <a href="/shop" className="shop-now-link">ShopNow</a>
          </p>
          <div className="language-selector">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Main Nav */}
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
            {/* Search Box */}
            <div className="search-wrapper">
              <input type="text" placeholder="What are you looking for?" className="search-input" />
              <Search size={18} className="search-icon" />
            </div>

            {/* Conditional User Icons */}
            {user && (
              <div className="user-icons">
                {/* Wishlist Icon */}
                <a href="/wishlist" className="icon-link">
                    <Heart size={24} />
                </a>

                {/* Cart Icon */}
                <a href="/cart" className="icon-link cart-icon">
                    <ShoppingCart size={24} />
                    {/* Placeholder for cart count - example: '2' */}
                    <span className="cart-count">2</span> 
                </a>

                {/* Account Icon */}
                <div className="account-container" onClick={toggleAccountMenu}>
                  <User size={24} />
                  
                  {/* Account Dropdown Menu */}
                  {isAccountMenuOpen && (
                    <div className="account-menu">
                      <a href="/account" className="account-item">
                        <User size={18} />
                        Manage My Account
                      </a>
                      <a href="/orders" className="account-item">
                        <Briefcase size={18} />
                        My Order
                      </a>
                      <a href="/cancellations" className="account-item">
                        <XCircle size={18} />
                        My Cancellations
                      </a>
                      <a href="/reviews" className="account-item">
                        <Star size={18} />
                        My Reviews
                      </a>
                      <a href="/logout" className="account-item">
                        <LogOut size={18} />
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