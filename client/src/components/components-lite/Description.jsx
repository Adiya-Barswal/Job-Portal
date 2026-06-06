import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useGetSingleJobs from "@/hooks/useGetSingleJob";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Fetch single job
  useGetSingleJobs(jobId);

  // Redux store data
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Check already applied or not
  const isApplied =
    singleJob?.applications?.some(
      (app) =>
        app?.applicant === user?._id || app?.applicant?._id === user?._id,
    ) || false;

  // Apply Job Handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };

        dispatch(setSingleJob(updatedJob));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Apply failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-xl shadow">
      {/* Title */}
      <h1 className="text-2xl font-bold">{singleJob?.title}</h1>

      {/* Badges */}
      <div className="flex gap-2 items-center mt-4">
        <Badge variant="ghost" className="text-blue-600 font-bold">
          {singleJob?.position} Position
        </Badge>

        <Badge variant="ghost" className="text-[#FA4F09] font-bold">
          {singleJob?.salary} LPA
        </Badge>

        <Badge variant="ghost" className="text-blue-600 font-bold">
          {singleJob?.location}
        </Badge>

        <Badge variant="ghost" className="text-black font-bold">
          {singleJob?.jobType}
        </Badge>
      </div>

      {/* Apply Button */}
      <div className="mt-4">
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-4 py-2 rounded-md ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-bold mb-4">Job Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-semibold">Role:</span> {singleJob?.title}
          </div>

          <div>
            <span className="font-semibold">Location:</span>{" "}
            {singleJob?.location}
          </div>

          <div>
            <span className="font-semibold">Salary:</span> {singleJob?.salary}{" "}
            LPA
          </div>

          <div>
            <span className="font-semibold">Experience:</span>{" "}
            {singleJob?.experienceLevel} Years
          </div>

          <div>
            <span className="font-semibold">Total Applicants:</span>{" "}
            {singleJob?.applications?.length}
          </div>

          <div>
            <span className="font-semibold">Posted:</span>{" "}
            {singleJob?.createdAt?.split("T")[0]}
          </div>

          <div>
            <span className="font-semibold">Job Type:</span>{" "}
            {singleJob?.jobType}
          </div>

          <div>
            <span className="font-semibold">Total Positions:</span>{" "}
            {singleJob?.position}
          </div>

          <div>
            <span className="font-semibold">Requirements:</span>{" "}
            {singleJob?.requirements?.join(", ")}
          </div>

          {/* Company Info */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">About the Company</h2>

            <p className="text-gray-700">
              {singleJob?.company?.description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
