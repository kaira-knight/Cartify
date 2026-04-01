import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./seller/layouts/SellerLayout";

// Components
import Navbar from "./customer/components/Navbar";
import Footer from "./customer/components/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";

// Customer Pages
import Home from "./pages/Home";
import Login from "./customer/pages/Login";
import Signup from "./customer/pages/Signup";
import ProductDetails from "./customer/pages/ProductDetails";
import Cart from "./customer/pages/Cart";
import Checkout from "./customer/pages/Checkout";
import Orders from "./customer/pages/Orders";

// Dashboard Pages
import CustomerDashboard from "./pages/CustomerDashboard";
import SellerDashboard from "./pages/SellerDashboard.jsx";
import BuyerDashboard from "./pages/BuyerDashboard.jsx";

// Seller Pages
import Dashboard from "./seller/pages/Dashboard";
import ProductList from "./seller/pages/products/ProductList";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>


      <Routes>

        {/* ================= CUSTOMER ROUTES ================= */}

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={
              <Login setUser={setUser} />
            }
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute user={user}>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute user={user}>
                <Orders />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* ================= ROLE DASHBOARDS ================= */}

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

        {/* ================= SELLER PANEL ================= */}

        <Route
          path="/seller"
          element={
            <ProtectedRoute user={user}>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="products"
            element={<ProductList />}
          />
        </Route>

      </Routes>


      {/* Toast Notifications */}
      <ToastContainer />

    </Router>
  );
}

export default App;