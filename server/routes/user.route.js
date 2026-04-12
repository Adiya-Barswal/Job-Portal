import express from "express";
import {
  register,
  login,
  logout,
  updateProfile
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// REGISTER
router.post("/register", singleUpload,register);

// LOGIN
router.post("/login", login);

// LOGOUT
router.get("/logout", logout);

// UPDATE PROFILE (protected route)
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;