import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
  forgotPassword,
  resetPassword,
  verifyRegisterOtp,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// REGISTER
router.post("/register", singleUpload, register);

// VERIFY OTP
router.post("/verify-otp", verifyRegisterOtp);

// LOGIN
router.post("/login", login);

// FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

// RESET PASSWORD
router.post("/reset-password/:token", resetPassword);

// LOGOUT
router.get("/logout", logout);

// UPDATE PROFILE (protected route)
router.post("/profile/update", isAuthenticated, singleUpload, updateProfile);

export default router;
