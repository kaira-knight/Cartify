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
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Login.css';

// const LoginPage = ({setUser}) => {

//   const [formData, setFormData] = useState({
//     emailOrPhone: '',
//     password: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simulate a login
//     const loggedInUser = { email: formData.emailOrPhone, name: "User" };
    
//     // 4. This updates the state in App.js
//     setUser(loggedInUser); 
//     console.log("Logged in!");
//   };
  
//   return (
//     <div className="login-container">
//       {/* Left Part: Image/Illustration */}
//       <div className="login-left">
//         <img 
//           src="https://images.unsplash.com/photo-1607082349566-187342175e2f" 
//           alt="Shopping Illustration" 
//           className="login-image"
//         />
//       </div>

//       {/* Right Part: Login Form */}
//       <div className="login-right">
//         <div className="form-wrapper">
//           <h2 className="login-title">Log in to Exclusive</h2>
//           <p className="login-subtitle">Enter your details below</p>
          
//           <form onSubmit={handleSubmit} className="login-form">
//             <div className="input-group">
//               <input 
//                 type="text" 
//                 placeholder="Email or Phone Number"
//                 value={formData.emailOrPhone}
//                 onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
//                 required
//               />
//             </div>
            
//             <div className="input-group">
//               <input 
//                 type="password" 
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 required
//               />
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="login-btn">Log In</button>
//               <Link to="/forgot-password" title="Forget Password?" className="forgot-link">
//                 Forget Password?
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; // ⭐ CHANGED
import "./Login.css";
 
const LoginPage = ({ setUser }) => {

  const navigate = useNavigate(); // ⭐ NEW

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    role: "customer" // ⭐ NEW
  });

  const handleSubmit = (e) => {
    e.preventDefault();

  if (!formData.emailOrPhone || !formData.password) {
    toast.error("Please fill all fields");
    return;
  }


    const loggedInUser = {
      email: formData.emailOrPhone,
      name: "User",
      role: formData.role // ⭐ CHANGED
    };

    setUser(loggedInUser);
toast.success(
  `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} login successful`
);
    console.log("Logged in:", loggedInUser);

    // ⭐ NEW REDIRECT

    if (formData.role === "customer") {
      navigate("/customer-dashboard");
    }

    if (formData.role === "seller") {
      navigate("/seller-dashboard");
    }

    if (formData.role === "buyer") {
      navigate("/buyer-dashboard");
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="Shopping"
        />
      </div>

      <div className="login-right">
        <div className="form-wrapper">

          <h2 className="login-title">
            Log in to Exclusive
          </h2>

          <p className="login-subtitle">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="input-group">
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={formData.emailOrPhone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailOrPhone: e.target.value
                  })
                }
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value
                  })
                }
                required
              />
            </div>

            {/* ⭐ NEW ROLE DROPDOWN */}

            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value
                })
              }
            >
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
              <option value="Admin">Admin</option>
            </select>

            <div className="form-actions">

              <button
                type="submit"
                className="login-btn"
              >
                Log In
              </button>

              <Link
                to="/forgot-password"
                className="forgot-link"
              >
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