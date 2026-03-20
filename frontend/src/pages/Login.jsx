// import React from "react";
// import "./Login.css";

// const Login = () => {
//   return (
//     <div className="signin-wrapper">
//       <div className="signin-container">
        
//         {/* Left Image */}
//         <div className="signin-image">
//           <img
//             src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg"
//             alt="shopping"
//           />
//         </div>

//         {/* Right Form */}
//         <div className="signin-form">
//           <h2>Log in to Exclusive</h2>
//           <p>Enter your details below</p>

//           <form>
//             <input type="text" placeholder="Email or Phone Number" />
//             <input type="password" placeholder="Password" />

//             <div className="btn-row">
//               <button type="submit">Log in</button>
//               <span className="forgot">Forget Password?</span>
//             </div>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login details:", formData);
  };

  return (
    <div className="login-container">
      {/* Left Part: Image/Illustration */}
      <div className="login-left">
        <img 
          src="https://cdn.dribbble.com/userupload/43929959/file/original-47a5da990dfc790e19907cecf9f32503.png?resize=752x&vertical=center" 
          alt="Shopping Illustration" 
          className="login-image"
        />
      </div>

      {/* Right Part: Login Form */}
      <div className="login-right">
        <div className="form-wrapper">
          <h2 className="login-title">Log in to Exclusive</h2>
          <p className="login-subtitle">Enter your details below</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input 
                type="text" 
                placeholder="Email or Phone Number"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
                required
              />
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="login-btn">Log In</button>
              <Link to="/forgot-password" title="Forget Password?" className="forgot-link">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
