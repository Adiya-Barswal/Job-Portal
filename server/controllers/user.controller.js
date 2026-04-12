import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ======== REGISTER =====
export const register = async (req, res) => {
  try {
    console.log("===== REGISTER API HIT =====");

    

    const { fullName, email, phoneNumber, password, role } = req.body;

    // ✅ validation
    if (!fullName || !email || !phoneNumber || !password || !role) {
      
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



    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // create user
    
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role
    });

    

    return res.status(201).json({
      message: "User registered successfully",
      user,
      success: true
    });

  } catch (error) {
    
  }
};



// ======== LOGIN =====
export const login = async (req, res) => {
  try {
    

    const { email, password, role } = req.body;

    if (!email || !password) {
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
        message: `Welcome back ${user.fullName}`,
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
    console.log("===== UPDATE PROFILE =====");

    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    await user.save();

    console.log("✅ Profile updated");

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true
    });

  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
  }
};