import React from "react";
import { Link } from 'react-router-dom';
import "./Signup.css";

function Signup() {
  return (
    <div className="signup-container">

      {/* LEFT */}
      <div className="left">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="shopping"
        />
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="form-box">
          <h2>Create an account</h2>
          <p>Enter your details below</p>

          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email or Phone Number" />
          <input type="password" placeholder="Password" />

          <button className="signup-btn">Create Account</button>

          <button className="google-btn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
            />
            Sign up with Google
          </button>

          <p className="login-text">
            Already have account? <span><Link to="/login" className="active-link">Log in </Link></span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Signup;