import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";


// ======== REGISTER =====
export const register = async (req, res) => {
  try {
    

    

    const { fullname, email, phoneNumber, password, role } = req.body;

    // ✅ validation
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    
    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      
      return res.status(400).json({
        message: "User already exists",
        success: false
      });
    }

    // ✅ Cloudinary upload (profile photo)
    let profilePhotoUrl = "";
    const file = req.file;

    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudinaryResponse.secure_url;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl  // ✅ pehle yeh missing tha
      }
    });

    

    return res.status(201).json({
      message: "User registered successfully",
      user,
      success: true
      });
   } catch (error) {

    console.log("❌ REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Register failed",
      success: false
    });
  }
};


// ======== LOGIN =====
export const login = async (req, res) => {
  try {
    

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email or password missing",
        success: false
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false
      });
    }

    // token
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
      });

  } catch (error) {
    console.log("❌ LOGIN ERROR:", error);
  }
};



// ======== LOGOUT =====
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logout successful",
        success: true
      });

  } catch (error) {
    console.log(error);
  }
};



// ======== UPDATE PROFILE =====
export const updateProfile = async (req, res) => {
  try {
   

    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file= req.file;

    // cloudinary upload

    let cloudinaryResponce;


    if (file) {
      const fileUri = getDataUri(file);

      cloudinaryResponce = await cloudinary.uploader.upload(fileUri.content);
    }

    const userId = req.userId;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

   // for resume  (cloudinary time)
   if (cloudinaryResponce) {

      user.profile.resume = cloudinaryResponce.secure_url;

      // BUG FIX ✅
      // wrong property fixed
      user.profile.resumeOriginalName = file.originalname;
    }

    // save updated user
    await user.save();

    

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true
    });

  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
  }
};