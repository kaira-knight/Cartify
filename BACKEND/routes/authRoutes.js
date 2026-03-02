import express from "express";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",protect,loginUser);
router.post("/forgot-password",forgotPassword);
router.put("/reset-password/:token",resetPassword);

export default router;