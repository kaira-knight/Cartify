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
            </ProtectedRoute>
          }
        />

        <Route
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
  );
}

export default App;