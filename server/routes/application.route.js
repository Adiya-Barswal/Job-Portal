import express from "express";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} from "../controllers/application.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

//  Apply Job (User)
router.post("/apply/:id", isAuthenticated, applyJob);

//  Get Applied Jobs (User)
router.get("/getapplied", isAuthenticated, getAppliedJobs);

//  Get Applicants (Admin / Recruiter)
router.get("/:id/applicants", isAuthenticated, getApplicants);
//  :id = jobId

//  Update Application Status (Admin)
router.put("/status/:id/update", isAuthenticated, updateStatus);
//  :id = applicationId

export default router;