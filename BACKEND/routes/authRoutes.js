import express from "express";
import { login, logout, register, resetPassword, sendOtp, verifyOtp } from "../controllers/authController.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.post("/sendOtp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/reset-password",resetPassword);


export default router;