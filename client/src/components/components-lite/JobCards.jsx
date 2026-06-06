import { Badge } from "@/components/ui/badge";
import React from "react";
import { useNavigate } from "react-router-dom";

function JobCards({ job }) {
  // ✅ Step 1: job prop liya

  const navigate = useNavigate();

  // ✅ Step 5: kitne din pehle post hui
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)} //  click pe detail page
      className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400 hover:p-3"
    >
      {/*  date */}
      <p className="text-sm text-gray-500">
        {daysAgoFunction(job?.createdAt) === 0
          ? "Today"
          : `${daysAgoFunction(job?.createdAt)} days ago`}
      </p>

      {/* ✅ Step 2: Company name + location */}
      <div className="flex items-center gap-3 my-2">
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>

      {/* ✅ Step 3: Job title + description */}
      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      {/* ✅ Step 3: Badges */}
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-600 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#FA4F09] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
        <Badge className="text-black font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
      </div>
    </div>
  );
}

export default JobCards;
