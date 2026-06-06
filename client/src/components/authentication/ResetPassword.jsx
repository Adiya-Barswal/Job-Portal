import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/data";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/reset-password/${token}`,
        { password },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // password reset hone ke baad login page
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="border p-6 rounded-md w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

        <input
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
