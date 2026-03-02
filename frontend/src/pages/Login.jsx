import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        
        {/* Left Image */}
        <div className="signin-image">
          <img
            src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg"
            alt="shopping"
          />
        </div>

        {/* Right Form */}
        <div className="signin-form">
          <h2>Log in to Exclusive</h2>
          <p>Enter your details below</p>

          <form>
            <input type="text" placeholder="Email or Phone Number" />
            <input type="password" placeholder="Password" />

            <div className="btn-row">
              <button type="submit">Log in</button>
              <span className="forgot">Forget Password?</span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;