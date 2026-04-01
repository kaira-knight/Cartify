<<<<<<< HEAD
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// ⭐ NEW IMPORTS

import CustomerDashboard from "./pages/CustomerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [user, setUser] = useState(null);


  return (
    <Router>

      <Navbar user={user} />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={
            <Login setUser={setUser} />
          }
        />

        {/* ⭐ NEW PROTECTED ROUTES */}

        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute
              user={user}
              role="customer"
            >
              <CustomerDashboard />
=======
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./seller/layouts/SellerLayout";

// Customer Pages
import Home from "./customer/pages/Home";
import Login from "./customer/pages/Login";
import Signup from "./customer/pages/Signup";
import ProductDetails from "./customer/pages/ProductDetails";
import Cart from "./customer/pages/Cart";
import Checkout from "./customer/pages/Checkout";
import Orders from "./customer/pages/Orders";

// Seller Pages
import Dashboard from "./seller/pages/Dashboard";
import ProductList from "./seller/pages/products/ProductList";

// Utils
import ProtectedRoute from "./utils/ProtectedRoute"; // ✅ FIXED CASE

function App() {
  return (
    <Routes>

      {/* ================= CUSTOMER ROUTES ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
>>>>>>> dev
            </ProtectedRoute>
          }
        />

        <Route
<<<<<<< HEAD
          path="/seller-dashboard"
          element={
            <ProtectedRoute
              user={user}
              role="seller"
            >
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer-dashboard"
          element={
            <ProtectedRoute
              user={user}
              role="buyer"
            >
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

<ToastContainer />

    </Router>
=======
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ================= SELLER ROUTES ================= */}
      <Route
        path="/seller"
        element={
          <ProtectedRoute>
            <SellerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
      </Route>

    </Routes>
>>>>>>> dev
  );
}

export default App;