import express from "express";
import {
  createProduct,
  getSellerProducts,
  getSellerProduct,
  updateProduct,
  deleteProduct,
  deleteGalleryImage,
  updateStock,
  toggleProductActive,
  getSellerStats,
} from "../controllers/sellerProductController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ── All routes require authentication + seller role ──
router.use(protect, authorizeRoles("seller", "admin"));

// ── Multer fields config ──
const productUpload = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "galleryImages", maxCount: 5 },
]);

// ── Stats (put before /:id to avoid conflict) ──
router.get("/stats", getSellerStats);

// ── CRUD ──
router.route("/")
  .get(getSellerProducts)
  .post(productUpload, createProduct);

router.route("/:id")
  .get(getSellerProduct)
  .put(productUpload, updateProduct)
  .delete(deleteProduct);

// ── Specific actions ──
router.patch("/:id/stock", updateStock);
router.patch("/:id/toggle-active", toggleProductActive);
router.delete("/:id/images/:imageId", deleteGalleryImage);

export default router;