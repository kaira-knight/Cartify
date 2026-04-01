import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  getCartCount,
  applyCoupon,
  removeCoupon,
  validateCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ── All cart routes need authentication ──
router.use(protect);

// ── Cart CRUD ──
router.route("/")
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

// ── Cart count for navbar ──
router.get("/count", getCartCount);

// ── Validate before checkout ──
router.get("/validate", validateCart);

// ── Coupon ──
router.post("/apply-coupon", applyCoupon);
router.delete("/remove-coupon", removeCoupon);

// ── Single item operations ──
router.route("/:itemId")
  .put(updateCartItem)
  .delete(removeFromCart);

// ── Quick increment/decrement ──
router.patch("/:itemId/increment", incrementQuantity);
router.patch("/:itemId/decrement", decrementQuantity);

export default router;