import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import {  Contact, Mail, Pen } from "lucide-react";
import AppliedJob from "./AppliedJob";

const skills = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "Node.js",
  "MongoDB",
  "MySQL",
  "Redux",
  "Tailwind CSS",
  "Docker",
  "Kubernetes"
];

const Profile = () => {

    const isResume = true;

  return (
    <div>

    
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md">

        
        <div className="flex items-center justify-between">
        
            {/* Avatar */}
            <div className="flex items-center gap-5">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://avatars.githubusercontent.com/u/168510042?v=4" />
              </Avatar>

               {/* Name + Bio */}
            <div>
              <h1 className="text-xl font-bold">
                Full Name
              </h1>

              <p>
                adsfgsgs gdggdghe hdhhhgrhhd dhdhdh
              </p>
            </div>
            </div>

            {/**edit button */}

            <Button className="text-right" variant="outline"><Pen></Pen></Button>

          </div>

          <div className="my-5">
            <div className="flex items-center gap-3 my-2 ">
                <Mail />
                    <span>aditya@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 my-2">
                <Contact />
                    <span>+918978787890</span>
            </div>
          </div>

          <div>
            <div className="my-5">
                 <h1>Skills</h1>
            <div className="flex items-center gap-2 ">
              {skills.length !== 0 ? (
                skills.map((item, index) => (
                  <Badge key={index} >{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
            </div>
          </div>

          <div>
             <div className="my-5">
  <label className="text-md font-bold mb-2 block">
    Upload Resume
  </label>

  {isResume ? (
    <Button asChild className="bg-black text-white hover:bg-gray-800">
      <a
        href="http://resume.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Resume
      </a>
    </Button>
  ) : (
    <span className="text-gray-500">No Resume Found</span>
  )}
</div>
</div>
          </div>

          
<div className="max-w-4xl mx-auto bg-white rounded-2xl">
            <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

            {/** Add application table */}
            <AppliedJob></AppliedJob>
          </div>

          </div>
  
  );
};

export default Profile;