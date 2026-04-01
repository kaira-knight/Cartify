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
import AddProduct from "./seller/pages/products/AddProduct";
import EditProduct from "./seller/pages/products/EditProduct";
import OrdersList from "./seller/pages/orders/OrdersList"; 
import Profile from "./seller/pages/profile/Profile";
import Settings from "./seller/pages/settings/Settings"; // <-- Added Settings Import

// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

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
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="profile" element={<Profile />} /> 
        
        {/* ================= INTEGRATED SETTINGS ROUTE ================= */}
        <Route path="settings" element={<Settings />} /> 
        
      </Route>

    </Routes>
  );
}

export default App;
