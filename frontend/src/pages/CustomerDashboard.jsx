import { Routes, Route } from "react-router-dom";

/* Customer Pages */

import Home from "./Home";
import Products from "./Products";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Payment from "./Payment";
import OrderSuccess from "./OrderSuccess";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import Profile from "./Profile";

function CustomerDashboard() {
  return (
    <Routes>

       <Route
        path="/"
        element={<Home />}
      /> 

      <Route
        path="products"
        element={<Products />}
      />

      <Route
        path="product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="cart"
        element={<Cart />}
      />

      <Route
        path="checkout"
        element={<Checkout />}
      />

      <Route
        path="payment"
        element={<Payment />}
      />

      <Route
        path="success"
        element={<OrderSuccess />}
      />

      <Route
        path="orders"
        element={<Orders />}
      />

      <Route
        path="wishlist"
        element={<Wishlist />}
      />

      <Route
        path="profile"
        element={<Profile />}
      />

    </Routes>
  );
}

export default CustomerDashboard;