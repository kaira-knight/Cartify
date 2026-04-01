
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin, clearError, clearMessage } from "../../redux/userSlice";
import "./Login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated && user) {
      toast.success(message || "Login successful");
      dispatch(clearMessage());

      // Redirect based on role
      if (user.role === "Customer") navigate("/");
      else if (user.role === "Seller") navigate("/seller-dashboard");
      else if (user.role === "Admin") navigate("/admin-dashboard");
      else navigate("/");
    }
  }, [error, isAuthenticated, user, message, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.emailOrPhone || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    // ✅ Send emailOrPhone
    dispatch(login({
      emailOrPhone: formData.emailOrPhone,
      password: formData.password,
    }));
  };

    // ========== GOOGLE SIGNUP ==========
    const handleGoogleSignup = useGoogleLogin({
      onSuccess: (tokenResponse) => {
        dispatch(googleLogin(tokenResponse.access_token));
      },
      onError: () => toast.error("Google signup failed"),
    });

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
          <h2 className="login-title">Log in to Cartify</h2>
          <p className="login-subtitle">Enter your details below</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={formData.emailOrPhone}
                onChange={(e) =>
                  setFormData({ ...formData, emailOrPhone: e.target.value })
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
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

               <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
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
            Sign in with Google
          </button>
            <div className="form-actions">
                        <p className="login-text">
            Don't have an account?
            <Link to="/signup" className="active-link"> Sign up</Link>
          </p>
                                  <p className="login-text">
            <Link to="/forgot-password" className="active-link">Forget Password?</Link>
          </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;