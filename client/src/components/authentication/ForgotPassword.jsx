import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  // NEW: loading state
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // NEW
      setLoading(true);

      const res = await axios.post(`${USER_API_ENDPOINT}/forgot-password`, {
        email,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      // NEW
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={submitHandler}
        className="border p-6 rounded-md w-[400px]"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded transition-all duration-200 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
