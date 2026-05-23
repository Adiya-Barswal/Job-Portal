
import React from "react";
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

function Navbar() {
   {/**first time    hamne ye kiya const user =false; */} 

   const{user} = useSelector((store) => store.auth)
   const dispatch = useDispatch();
   const navigate = useNavigate();


   {/** for logout */}

   const logoutHandler = async () => {

  try {

    const response = await axios.get(
      `${USER_API_ENDPOINT}/logout`,
      {
        withCredentials: true
      }
    );

    if (response.data.success) {

      toast.success("Logged out successfully");

      dispatch(setUser(null));

      navigate("/");

      toast.success("Logout successfully")

    } else {

      toast.error("Failed to log out");

    }

  } catch (error) {

    console.log(error);

    toast.error(error.response.data.message);

  }
};


  return (
    <div className='bg-white'>
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/*left */}
        <div>
            <h1 className='text-2xl font-bold'>
              <span className='text-[#6B3AC2]'>Job</span> 
              <span className='text-[#FA4F09]'>Portal</span>
               </h1>
        </div>

        {/*right */}
        <div className="flex items-center gap-10">
           <ul className='flex font-medium items-center gap-6'>

            {user && user.role === "recruiter" ? (
              //  Recruiter links
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                  </li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              //  Student links
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/browse">Browse</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
              </>
            )}

          </ul>

            {/* CONDITION FIX  from turnary operator*/}

            {
                !user ? (
                  <div className="flex items-center gap-2">
                     <Link to="/login">
                     {" "}
                     <Button variant="outline">Login</Button>
                     </Link>
                     <Link to="/register" >
                     {" "}
                     <Button className="bg-red-600 hover:bg-red-700">Register</Button>
                     </Link>
                      </div>

                ) : (
                   <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
  <AvatarImage src={user?.profile?.profilePhoto} />

  {/**if photo does not upload then names comes photo */}
  <AvatarFallback>{user?.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
</Avatar >
      </PopoverTrigger>
<PopoverContent align="end" sideOffset={8} className="w-80  translate-x-8">
<div className="flex items-center gap-4 ">
 <Avatar className="cursor-pointer">
  <AvatarImage src={user?.profile?.profilePhoto} />
  {/*<AvatarFallback>CN</AvatarFallback>*/}
</Avatar >
   {/*text */}
<div className="flex flex-col">
      <h3 className="font-medium">{user?.fullname}</h3>
      <p className="text-sm text-muted-foreground">
        {user?.profile?.bio}
      </p>
    </div>
</div> 

       {/* Buttons */}
              <div className="flex flex-col my-2 text-gray-600  mt-4">

                {
                  user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2></User2>
                    <Button variant="link"> <Link to="/profile">Profile</Link></Button>
                </div>

                  )
                }



               
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                </div>
                
                
              </div>
          </PopoverContent>
      </Popover>
        )}
          </div> 
    </div>
    </div>
  );
}

export default Navbar;


