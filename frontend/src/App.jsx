import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layouts
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./seller/layouts/SellerLayout";

// Customer Pages
import Home from "./customer/pages/Home";
import Login from "./customer/pages/Login";
import Signup from "./customer/pages/Signup";
import ProductDetails from "./customer/pages/ProductDetails";
import ProductListc from "./customer/pages/ProductListc";
import Cart from "./customer/pages/Cart";
import Checkout from "./customer/pages/Checkout";
import Orders from "./customer/pages/Orders";
import NotFound from "./customer/pages/NotFound";
import Wishlist from "./customer/pages/Wishlist";
import OrderSuccess from "./customer/pages/OrderSuccess";


// Seller Pages
import Dashboard from "./seller/pages/Dashboard";
import ProductList from "./seller/pages/products/ProductList";
import AddProduct from "./seller/pages/products/AddProduct";
import EditProduct from "./seller/pages/products/EditProduct";
import OrdersList from "./seller/pages/orders/OrdersList";
import Profile from "./seller/pages/profile/Profile";
import Settings from "./seller/pages/settings/Settings";

// Utils
import ProtectedRoute from "./utils/ProtectedRoute";
import Contact from "./customer/pages/Contact";
import About from "./customer/pages/About";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>

        {/* ================= CUSTOMER ROUTES ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/productlist" element={<ProductListc />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          

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

        {/* ================= SELLER ROUTES ================= */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute user={user}>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>

      {/* Toast Notifications */}
      <ToastContainer />
    </Router>
  );
}

export default App;