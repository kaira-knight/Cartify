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
            </ProtectedRoute>
          }
        />

        <Route
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
  );
}

export default App;