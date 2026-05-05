import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import {  Contact, Mail, Pen } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";

{/*
// const skills = [
//   "React",
//   "JavaScript",
//   "HTML",
//   "CSS",
//   "Python",
//   "Node.js",
//   "MongoDB",
//   "MySQL",
//   "Redux",
//   "Tailwind CSS",
//   "Docker",
//   "Kubernetes"
// ]; 

*/}


{/** isResume = true;   after  const isResume = user?.profile?.resume;*/}

 

const Profile = () => {

  const [open, setOpen] = useState(false);

  const {user} = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume;

  return (
    <div>

    
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md">

        
        <div className="flex items-center justify-between">
        
            {/* Avatar */}
            <div className="flex items-center gap-5">
             <Avatar className="h-24 w-24">
              
              <AvatarImage src={user?.profile?.profilePhoto} />
              {/* ✅ FIX: fallback add kiya — photo na ho toh naam ka pehla letter dikhega */}
              <AvatarFallback>{user?.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

               


               {/* Name + Bio */}
            <div>
              <h1 className="text-xl font-bold">
                {user?.fullname}
              </h1>

              <p>
                {user?.profile?.bio}
              </p>
            </div>
            </div>

            {/**edit button */}

            <Button onClick= {() => setOpen(true)} className="text-right" variant="outline"><Pen></Pen></Button>

          </div>

          <div className="my-5">
            <div className="flex items-center gap-3 my-2 ">
                <Mail /> 
                    <span>
                      <a href={`mailto:${user?.email}`}>{user?.email}</a>
                    </span>
            </div>

            <div className="flex items-center gap-3 my-2">
                <Contact />
                    <span>
                      <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
                      </span>
            </div>
          </div>

          <div>
            <div className="my-5">
                 <h1>Skills</h1>
            <div className="flex items-center gap-2 ">
              {user?.profile?.skills?.length !== 0 ?  (
               user?.profile?.skills.map ((item, index) => (
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
      href={user?.profile?.resume}
      target="_blank"
      rel="noopener noreferrer"
    >
      Download
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

          {/**edit profile model */}
          <EditProfileModal open={open} setOpen={setOpen} />

          </div>
  
  );
};

export default Profile;




