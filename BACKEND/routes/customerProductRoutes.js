import express from "express";
import {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getProductsByCategory,
  getRelatedProducts,
  addReview,
  deleteReview,
  getProductReviews,
  getAvailableFilters,
} from "../controllers/customerProductController.js";
import { protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// ── Public routes (no auth needed) ──
router.get("/",                    getAllProducts);
router.get("/featured",            getFeaturedProducts);
router.get("/filters",             getAvailableFilters);
router.get("/category/:category",  getProductsByCategory);
router.get("/:id",                 getProductById);
router.get("/:id/related",         getRelatedProducts);
router.get("/:id/reviews",         getProductReviews);

// ── Protected routes (auth required) ──
router.post("/:id/reviews",   protect, addReview);
router.delete("/:id/reviews", protect, deleteReview);

export default router;