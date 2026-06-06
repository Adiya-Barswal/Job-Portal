import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// 🔹 Apply Job
export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.id;

    // 🔥 DEBUG LOGS (yahi likhna hai)
    console.log("userId:", userId);
    console.log("jobId:", jobId);

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    // already applied check
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied",
        success: false,
      });
    }

    // check job exists
    const job = await Job.findById(jobId);

    // 🔥 YAHAN ADD KARNA HAI
    console.log("job:", job);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    console.log("after create");

    // push application id into job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error applying job",
      success: false,
    });
  }
};

// 🔹 Get Applied Jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // ✅ FIX: Sort ❌ → sort ✅
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
        },
      });

    return res.status(200).json({
      applications, // ✅ FIX: application ❌ → applications ✅
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching applied jobs",
      success: false,
    });
  }
};

//  Get Applicants (Admin)
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error fetching applicants",
      success: false,
    });
  }
};

//  Update Status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const application = await Application.findById(applicationId); // ✅ FIX

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    application.status = status.toLowerCase(); // ✅ update
    await application.save(); // ✅ save

    return res.status(200).json({
      message: "Status updated successfully",
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message, // 🔥 real error dikhega
      success: false,
    });
  }
};
