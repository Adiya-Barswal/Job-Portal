import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phoneNumber: String,
  password: String,
  role: String,

  otp: String,
  otpExpire: Date,
});

const TempUser = mongoose.model("TempUser", tempUserSchema);

export default TempUser;
