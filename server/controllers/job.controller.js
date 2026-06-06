import { Job } from "../models/job.model.js";

//  Create Job / create job      for users
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.userId;

    // validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "please fill all the all fiels",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // array bana diya
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company: companyId,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating job",
      success: false,
    });
  }
};

//  Get All Jobs      for users

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { experienceLevel: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//  Get Job by ID     for users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate("company")
      .populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching job",
      success: false,
    });
  }
};

//  Get Admin Jobs   (jo recruiter ne banayi)
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;

    const jobs = await Job.find({ createdBy: adminId }).populate("company");

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching admin jobs",
      success: false,
    });
  }
};

//  Update Job
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
    } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        requirements: requirements?.split(","),
        salary,
        location,
        jobType,
        experienceLevel,
        position,
      },
      { new: true },
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating job",
      success: false,
    });
  }
};

//  Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting job",
      success: false,
    });
  }
};

// Save Job
export const saveJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { jobId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({
        message: "Job already saved",
        success: false,
      });
    }

    user.savedJobs.push(jobId);
    await user.save();

    return res.status(200).json({
      message: "Job saved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Saved Jobs
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("savedJobs");

    return res.status(200).json({
      savedJobs: user.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
