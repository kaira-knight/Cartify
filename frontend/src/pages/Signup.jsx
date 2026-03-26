import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";
import { googleLogin } from "../../../BACKEND/controllers/authController";

function Signup() {

  const navigate = useNavigate();

  // STATE

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // PASSWORD VALIDATION FUNCTION

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

    return passwordRegex.test(password);
  };

  // HANDLE SIGNUP

  const handleSignup = () => {

    const {
      name,
      email,
      password,
      confirmPassword
    } = formData;

    // EMPTY FIELD CHECK

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    // PASSWORD MATCH CHECK

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // PASSWORD RULE CHECK

    if (!validatePassword(password)) {

      toast.error(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character"
      );

      return;
    }

    // CHECK IF USER ALREADY EXISTS

    const existingUser =
      JSON.parse(localStorage.getItem("user"));

    if (existingUser &&
        existingUser.email === email) {

      toast.error(
        "User already exists with this email"
      );

      return;
    }

    // SAVE USER

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        email,
        password
      })
    );

    console.log("Account created:", formData);

    // SUCCESS MESSAGE

    toast.success(
      "Account created successfully"
    );

    // REDIRECT

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  };



<GoogleLogin
  onSuccess={async (res) => {
    const result = await googleAuth(res.credential);
    console.log(result);
  }}
  onError={() => console.log("Login Failed")}
/>





  return (
    <div className="signup-container">

      {/* LEFT IMAGE */}

      <div className="left">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="shopping"
        />
      </div>

      {/* RIGHT FORM */}

      <div className="right">

        <div className="form-box">

          <h2>Create an account</h2>

          <p>Enter your details below</p>

          {/* NAME */}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* EMAIL */}

          <input
            type="text"
            name="email"
            placeholder="Email or Phone Number"
            value={formData.email}
            onChange={handleChange}
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* CONFIRM PASSWORD */}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* PASSWORD RULES */}

          <p className="password-rules">
            Password must contain:
            <br />
            • Minimum 8 characters
            <br />
            • 1 uppercase letter
            <br />
            • 1 number
            <br />
            • 1 special character
          </p>

          {/* BUTTON */}

          <button
            className="signup-btn"
            onClick={handleSignup}
          >
            Create Account
          </button>

          {/* GOOGLE BUTTON */}

          <button className="google-btn"
          onClick={()=>googleLogin()}>

            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
            />

            Sign up with Google

          </button>

          {/* LOGIN LINK */}

          <p className="login-text">

            Already have account?

            <Link
              to="/login"
              className="active-link"
            >
              {" "}Log in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;