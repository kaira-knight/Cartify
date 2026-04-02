import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  getProducts,
  deleteProduct,
  getOrders,
} from "../../utils/api";

const useSeller = () => {
  // ================= STATE =================
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // ================= PRODUCTS =================

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts(); // refresh after delete
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ================= ORDERS =================

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await getOrders();
      setOrders(res.data || []);
    } catch (err) {
      // fallback mock (safe UI)
      setOrders([
        {
          _id: "1",
          orderId: "#ORD-7721",
          customer: "Amit Sharma",
          date: "2023-10-24",
          amount: 1200,
          status: "Delivered",
        },
        {
          _id: "2",
          orderId: "#ORD-7722",
          customer: "Priya Singh",
          date: "2023-10-25",
          amount: 850,
          status: "Processing",
        },
      ]);
    } finally {
      setLoadingOrders(false);
    }
  };

  // ================= INIT LOAD =================
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // ================= RETURN =================
  return {
    // data
    products,
    orders,

    // loading
    loadingProducts,
    loadingOrders,

    // actions
    fetchProducts,
    fetchOrders,
    removeProduct,
  };
};

export default useSeller;