import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // ✅ 1. Redux store se data lene ke liye
import useGetSingleJobs from "@/hooks/useGetSingleJob";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const Description = () => {

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch(); 

  //  2. Hook call kiya — API se job fetch hogi aur Redux mein save hogi
  useGetSingleJobs(jobId);

  //  3. Redux store se singleJob liya — hook ne yahan save kiya tha
  const { singleJob } = useSelector((store) => store.job);

  //  4. User liya — apply check karne ke liye
  const { user } = useSelector((store) => store.auth);

  // 5. Check karo user ne apply kiya hai ya nahi
  
const isApplied = singleJob?.applications?.some(
  (app) => app?.applicant === user?._id || app?.applicant?._id === user?._id
) || false;


    {/**Apply handler add kiya */} 
  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { _id: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
      
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Apply failed");
    }
  };


  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-xl shadow">

      <div>
        {/* ✅ 6. Hardcoded "Title" hataya — real job title aayega */}
        <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
      </div>

      <div>
        <div className="flex gap-2 items-center mt-4">
          {/* ✅ 7. Hardcoded badges hataye — real data bind kiya */}
          <Badge className="text-blue-600 font-bold" variant="ghost">{singleJob?.position} Position</Badge>
          <Badge className="text-[#FA4F09] font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
          <Badge className="text-blue-600 font-bold" variant="ghost">{singleJob?.location}</Badge>
          <Badge className="text-black font-bold" variant="ghost">{singleJob?.jobType}</Badge>
        </div>
      </div>

      <div className="mt-4">
        {/*  8. isApplied dynamic hai ab — pehle hardcoded true tha */}
        <Button onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-md px-4 py-2 ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="mt-6 border-t pt-4">
        <h2 className="font-bold text-lg mb-4">Job Details</h2>
        <div className="space-y-3 text-sm">

          <div>
            <span className="font-semibold">Role: </span>
            {/*  9. Hardcoded "Software Engineer" hataya */}
            <span className="text-gray-700">{singleJob?.title}</span>
          </div>

          <div>

            <span className="font-semibold">Location: </span>
            {/*  10. Hardcoded "Delhi" hataya */}
            <span className="text-gray-700">{singleJob?.location}</span>
          </div>

          <div>
            <span className="font-semibold">Salary: </span>
            {/*  11. Hardcoded "20 LPA" hataya */}
            <span className="text-gray-700">{singleJob?.salary} LPA</span>
          </div>

          <div>
            <span className="font-semibold">Experience: </span>
            {/* 12. Hardcoded "2 Years" hataya */}
            <span className="text-gray-700">{singleJob?.experienceLevel} Years</span>
          </div>

          <div>
            <span className="font-semibold">Total applicants: </span>
            {/* kitne logo ne applied kiya hai  */}
            <span className="text-gray-700">{singleJob?.applications?.length}</span>
          </div>

          <div>
            {/** for date */}
  <span className="font-semibold">Posted: </span>
  <span className="text-gray-700">
    {singleJob?.createdAt?.split("T")[0]}
  </span>
</div>

          <div>
            <span className="font-semibold">Job Type: </span>
            {/* 13. Hardcoded "Full Time" hataya */}
            <span className="text-gray-700">{singleJob?.jobType}</span>
          </div>

          <div>
            <span className="font-semibold">Total Positions: </span>
            {/*  14. Hardcoded "10" hataya */}
            <span className="text-gray-700">{singleJob?.position}</span>
          </div>

          <div className="mt-6 border-t pt-4">
            <h2 className="font-bold text-lg mb-2">About the Company</h2>
            {/*  15. Hardcoded Microsoft description hataya — real company data aayega */}
            <p className="text-gray-700 text-sm leading-7">
              {singleJob?.company?.description || "No description available"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Description;