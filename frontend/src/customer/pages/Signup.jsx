
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { register, googleLogin, clearError, clearMessage } from "../../redux/userSlice";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",    // ✅ Single field
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message && !isAuthenticated) {
      toast.success(message);
      dispatch(clearMessage());
      setTimeout(() => navigate("/login"), 2000);
    }
    if (isAuthenticated) {
      toast.success(message || "Signup successful");
      dispatch(clearMessage());
      navigate("/");
    }
  }, [error, message, isAuthenticated, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password);
  };

  // ========== NORMAL SIGNUP ==========
  const handleSignup = () => {
    const { name, emailOrPhone, password, confirmPassword } = formData;

    if (!name || !emailOrPhone || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character"
      );
      return;
    }

    // ✅ Send emailOrPhone — slice will detect type
    dispatch(register({ name, emailOrPhone, password }));
  };

  // ========== GOOGLE SIGNUP ==========
  const handleGoogleSignup = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(googleLogin(tokenResponse.access_token));
    },
    onError: () => toast.error("Google signup failed"),
  });

  return (
    <div className="signup-container">
      <div className="left">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
          alt="shopping"
        />
      </div>

      <div className="right">
        <div className="form-box">
          <h2>Create an account</h2>
          <p>Enter your details below</p>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* ✅ Single field for email OR phone */}
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Phone Number"
            value={formData.emailOrPhone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <p className="password-rules">
            Password must contain:
            <br />• Minimum 8 characters
            <br />• 1 uppercase letter
            <br />• 1 number
            <br />• 1 special character
          </p>

          <button
            className="signup-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <button
            className="google-btn"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
            />
            Sign up with Google
          </button>

          <p className="login-text">
            Already have account?
            <Link to="/login" className="active-link"> Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;