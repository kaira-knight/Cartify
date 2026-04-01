import axios from "axios";

// ================= CONFIG =================
const STORAGE_KEY = "cartify_products";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // for future backend use
});

// ================= AUTH INTERCEPTOR =================
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ================= LOCAL STORAGE HELPERS =================
const getLocalProducts = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const setLocalProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// ================= PRODUCT APIs (MOCK MODE) =================

// GET ALL PRODUCTS
export const getProducts = async () => {
  return { data: getLocalProducts() };
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const products = getLocalProducts();
  const product = products.find((p) => p._id === id);
  return { data: product };
};

// CREATE PRODUCT
export const createProduct = async (data) => {
  const products = getLocalProducts();

  const newProduct = {
    ...data,
    _id: Date.now().toString(),
  };

  products.push(newProduct);
  setLocalProducts(products);

  return { data: newProduct };
};

// UPDATE PRODUCT
export const updateProduct = async (id, data) => {
  let products = getLocalProducts();

  products = products.map((p) =>
    p._id === id ? { ...p, ...data } : p
  );

  setLocalProducts(products);

  return { data };
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  let products = getLocalProducts();

  products = products.filter((p) => p._id !== id);

  setLocalProducts(products);

  return { success: true };
};

// ================= GOOGLE AUTH =================
export const googleAuth = async (accessToken) => {
  const googleRes = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const res = await axios.post(
    "http://localhost:8000/api/auth/google-login",
    {
      name: googleRes.data.name,
      email: googleRes.data.email,
      picture: googleRes.data.picture,
      googleId: googleRes.data.sub,
    }
  );

  return res.data;
};

// ================= ORDER APIs (MOCK MODE) =================

export const getOrders = async () => {
  // Mock data, later replace with real API call
  const mockOrders = [
    { _id: "1", orderId: "#ORD-7721", customer: "Amit Sharma", date: "2023-10-24", amount: 1200, status: "Delivered" },
    { _id: "2", orderId: "#ORD-7722", customer: "Priya Singh", date: "2023-10-25", amount: 850, status: "Processing" },
    { _id: "3", orderId: "#ORD-7723", customer: "Rahul Verma", date: "2023-10-25", amount: 540, status: "Shipped" },
    { _id: "4", orderId: "#ORD-7724", customer: "Sania Mirza", date: "2023-10-26", amount: 2100, status: "Cancelled" },
  ];
  
  return { data: mockOrders };
};
