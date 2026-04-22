
import React from "react";
import { Button } from "@/components/ui/button"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const user =false;
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
              
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to={"/Jobs"}>Jobs</Link>
                
                
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
  <AvatarImage src="https://github.com/shadcn.png" />
  {/*<AvatarFallback>CN</AvatarFallback>*/}
</Avatar >
      </PopoverTrigger>
<PopoverContent align="end" sideOffset={8} className="w-80  translate-x-8">
<div className="flex items-center gap-4 ">
 <Avatar className="cursor-pointer">
  <AvatarImage src="https://github.com/shadcn.png" />
  {/*<AvatarFallback>CN</AvatarFallback>*/}
</Avatar >
   {/*text */}
<div className="flex flex-col">
      <h3 className="font-medium">Aditya Barswall</h3>
      <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis perferendis quasi magni laborum a placeat voluptate rem animi reprehenderit dignissimos culpa !

      </p>
    </div>
</div> 

       {/* Buttons */}
              <div className="flex flex-col my-2 text-gray-600  mt-4">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2></User2>
                    <Button variant="link">Profile</Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button variant="link">Logout</Button>
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


