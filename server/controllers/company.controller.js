import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

// Register Company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // Check if already exists
    let company = await Company.findOne({ companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    company = await Company.create({
      companyName,
      userId: req.userId, // 👈 JWT se aaya hua userId
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//  Get All Companies (by user)
export const getCompanies = async (req, res) => {
  try {
    const userId = req.userId; //logged in user id h ye

    const companies = await Company.find({ userId });

    if (!companies)
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//  Get Company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//  Update Company
export const updateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const file = req.file;

    //  cloudinary
    let logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponce = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponce.secure_url;
    }

    const updateData = {
      companyName,
      description,
      website,
      location,
      ...(logo && { logo }),
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
