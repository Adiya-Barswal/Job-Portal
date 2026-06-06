import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { JOB_API_ENDPOINT } from "@/utils/data";

function PostJob() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company); // ✅ Redux se companies

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "0",
    companyId: "",
    role: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 min-h-screen">
      <div className="my-10">
        <h1 className="font-bold text-2xl">Post New Job</h1>
        <p className="text-gray-500">Fill in the details to post a new job.</p>
      </div>

      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-4 border border-gray-500 shadow-sm hover:shadow-xl hover:shadow-red-300 rounded-lg p-6">
          <div>
            <Label>Job Title</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              type="text"
              name="title"
              value={input.title}
              onChange={changeHandler}
              placeholder="Enter Job Title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="description"
              value={input.description}
              onChange={changeHandler}
              placeholder="Enter Job description"
            />
          </div>

          <div>
            <Label>Requirements</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="requirements"
              value={input.requirements}
              onChange={changeHandler}
              placeholder="React, Node.js, MongoDB, "
            />
          </div>

          <div>
            <Label>Role</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="role"
              value={input.role}
              onChange={changeHandler}
              placeholder="Enter Job Role"
            />
          </div>

          <div>
            <Label>Salary</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="salary"
              value={input.salary}
              onChange={changeHandler}
              placeholder="e.g. 10 LPA or 20k-30k"
              type="text" // ✅ text — taaki LPA bhi likh sake
            />
          </div>

          <div>
            <Label>Location</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="location"
              value={input.location}
              onChange={changeHandler}
              placeholder="Enter Job Location"
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <select
              name="jobType"
              value={input.jobType}
              onChange={changeHandler}
              className="w-full border border-gray-300 rounded-md p-2 my-2 focus:border-black focus:outline-none"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <Label>Experience Level (Years)</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="experienceLevel"
              value={input.experienceLevel}
              onChange={changeHandler}
              placeholder="1"
              type="number"
            />
          </div>

          <div>
            <Label>No. of Positions</Label>
            <Input
              className="my-2 focus-visible:border-black focus-visible:ring-0"
              name="position"
              value={input.position}
              onChange={changeHandler}
              placeholder="2"
              type="number"
            />
          </div>

          {/* ✅ Company dropdown */}
          <div>
            <Label>Company</Label>
            <select
              name="companyId"
              value={input.companyId}
              onChange={changeHandler}
              className="w-full border border-gray-300 rounded-md p-2 my-2 focus:border-black focus:outline-none"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Buttons */}
          <div className="col-span-2 flex items-center gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/jobs")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white hover:bg-blue-600 px-8"
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>

            {/* ✅ companies Redux se check */}
            {companies.length === 0 && (
              <p className="text-sm text-red-600">
                Please register a company to post jobs.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostJob;
