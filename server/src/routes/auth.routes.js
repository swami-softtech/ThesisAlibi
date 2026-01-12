import express from "express";
import {
    register,
    verifyOtp,
    createPassword,
    login,
    forgotPassword,
    resetPassword,
    resendOtp
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/create-password", createPassword);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOtp);

export default router;
