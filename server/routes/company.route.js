import express from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//  Register Company
router.post("/register", isAuthenticated, registerCompany);

//  Get all companies (of logged in user)
router.get("/get", isAuthenticated, getCompanies);

//  Get single company by id
router.get("/get/:id", isAuthenticated, getCompanyById);

//  Update company
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;