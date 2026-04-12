import express from "express";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  updateJob,
  deleteJob
  
} from "../controllers/job.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// 🔹 Create Job (Recruiter only)
router.post("/post", isAuthenticated, postJob);

// 🔹 Get All Jobs (Public + Search)
router.get("/get", getAllJobs);

// 🔹 Get Single Job
router.get("/get/:id", getJobById);

// 🔹 Get Admin Jobs (Recruiter ke jobs)
router.get("/admin", isAuthenticated, getAdminJobs);

// 🔹 Update Job
router.put("/update/:id", isAuthenticated, updateJob);

// 🔹 Delete Job
router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;