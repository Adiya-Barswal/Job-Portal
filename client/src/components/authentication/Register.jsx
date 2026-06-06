import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // REGISTER
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);

    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        setShowOtp(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // VERIFY OTP
  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/verify-otp`, {
        email: input.email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      if (res.data.success) {
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  };

  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        onSubmit={submitHandler}
        className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
      >
        <h1 className="font-bold text-xl mb-5 text-center text-blue-500">
          Register
        </h1>

        {/* FULL NAME */}
        <div className="my-2">
          <Label>Fullname</Label>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            placeholder="john doe"
          />
        </div>

        {/* EMAIL */}
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            placeholder="johndoe@gmail.com"
          />
        </div>

        {/* PASSWORD */}
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            placeholder="*************"
          />
        </div>

        {/* PHONE */}
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            placeholder="+1234567890"
          />
        </div>

        {/* ROLE */}
        <RadioGroup className="flex gap-4 my-5">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={input.role === "student"}
              onChange={changeEventHandler}
            />
            Student
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
            />
            Recruiter
          </label>
        </RadioGroup>

        {/* FILE */}
        <Input type="file" accept="image/*" onChange={changeFileHandler} />

        {/* LOADER */}
        {loading ? (
          <div className="flex justify-center my-5">
            <Loader2 className="animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            {/* REGISTER BUTTON */}
            {!showOtp && (
              <button
                type="submit"
                className="w-full bg-black text-white py-2 mt-4"
              >
                Register
              </button>
            )}

            {/* OTP BOX */}
            {showOtp && (
              <div className="mt-4 border p-3 rounded-md">
                <Label>Enter OTP</Label>

                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6 digit OTP"
                />

                <button
                  type="button"
                  onClick={verifyOtpHandler}
                  className="w-full mt-3 bg-green-600 text-white py-2"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {/* LOGIN LINK */}
            <p className="text-gray-500 mt-3">
              Already have account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
