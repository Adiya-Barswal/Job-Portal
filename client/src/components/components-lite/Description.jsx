import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";




const Description = () => {

  const isApplied = true;

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-xl shadow">

        <div>
      {/* Title  */}

      <h1 className="text-2xl font-bold">Title</h1>
      </div>

      {/**job info */}
      <div>
        <div className="flex gap-2 items-center mt-4">
                          <Badge className={" text-blue-600 font-bold"} variant="ghost">10 Position</Badge>
                          <Badge className={" text-[#FA4F09] font-bold"} variant="ghost">20 LPA</Badge>
                          <Badge className={" text-blue-600 font-bold"} variant="ghost">Remote</Badge>
                         <Badge className={"  text-black font-bold "} variant="ghost">Full Time</Badge>
                  
                        </div>
                      </div>

          {/**apply button */}
<div>         
<Button
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
{/* 🔥 Job Details Section */}
<div className="mt-6 border-t pt-4">

  <h2 className="font-bold text-lg mb-4">Job Details</h2>

  <div className="space-y-3 text-sm">

    <div>
      <span className="font-semibold">Role: </span>
      <span className="text-gray-700">Software Engineer</span>
    </div>

    <div>
      <span className="font-semibold">Location: </span>
      <span className="text-gray-700">Delhi</span>
    </div>

    <div>
      <span className="font-semibold">Salary: </span>
      <span className="text-gray-700">20 LPA</span>
    </div>

    <div>
      <span className="font-semibold">Experience: </span>
      <span className="text-gray-700">2 Years</span>
    </div>

    <div>
      <span className="font-semibold">Job Type: </span>
      <span className="text-gray-700">Full Time</span>
    </div>

    <div>
      <span className="font-semibold">Total Positions: </span>
      <span className="text-gray-700">10</span>
    </div>

    <div className="mt-6 border-t pt-4">

  <h2 className="font-bold text-lg mb-2">About the Company</h2>

  <p className="text-gray-700 text-sm leading-7">
    Microsoft is a global technology company focused on building innovative 
    software, services, and solutions. The company is known for products like 
    Windows, Azure, and Office, and works on cutting-edge technologies including 
    cloud computing, AI, and enterprise solutions.
  </p>

</div>

  </div>
</div>




 </div>
    
  

  );
};

export default Description;