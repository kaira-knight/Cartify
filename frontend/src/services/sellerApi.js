// src/services/sellerApi.js

import API from "./apiClient";

const STORAGE_KEY = "cartify_products";

// ================= LOCAL STORAGE =================
const getLocalProducts = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const setLocalProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

// ================= PRODUCTS =================

// GET ALL
export const getProducts = async () => {
  return { data: getLocalProducts() };
};

// GET ONE
export const getProductById = async (id) => {
  const products = getLocalProducts();
  return { data: products.find((p) => p._id === id) };
};

// CREATE
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

// UPDATE
export const updateProduct = async (id, data) => {
  let products = getLocalProducts();

  products = products.map((p) =>
    p._id === id ? { ...p, ...data } : p
  );

  setLocalProducts(products);

  return { data };
};

// DELETE
export const deleteProduct = async (id) => {
  let products = getLocalProducts();

  products = products.filter((p) => p._id !== id);
  setLocalProducts(products);

  return { success: true };
};

// ================= ORDERS =================

export const getOrders = async () => {
  return {
    data: [
      { _id: "1", orderId: "#ORD-7721", customer: "Amit Sharma", date: "2023-10-24", amount: 1200, status: "Delivered" },
      { _id: "2", orderId: "#ORD-7722", customer: "Priya Singh", date: "2023-10-25", amount: 850, status: "Processing" },
      { _id: "3", orderId: "#ORD-7723", customer: "Rahul Verma", date: "2023-10-25", amount: 540, status: "Shipped" },
      { _id: "4", orderId: "#ORD-7724", customer: "Sania Mirza", date: "2023-10-26", amount: 2100, status: "Cancelled" },
    ],
  };
};