import React, { useState } from "react";


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay

} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";


const EditProfileModal = ({ open, setOpen }) => {

    const [loading, setLoading]= useState(false);

    const {user} = useSelector((store) =>store.auth);

    const [input, setInput] = useState({
  fullname: user?.fullname || "",
  email: user?.email || "",
  phoneNumber: user?.phoneNumber || "",
  bio: user?.profile?.bio || "",
  skills: user?.profile?.skills?.join(", ") || "",
  file: null,
});

    const dispatch= useDispatch();


    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value})

    };

    const handleSubmit =async (e) => {
          e.preventDefault(); 
          setLoading(true);

        

          const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
         formData.append("phoneNumber", input.phoneNumber);
         formData.append("bio", input.bio);
         formData.append("skills", input.skills);

  if (input.file) {
    formData.append("file", input.file);
  }

  try {
    setLoading(true);
    const res = await axios.post(
      `${USER_API_ENDPOINT}/profile/update`,
      formData,
      {
       
        withCredentials: true,
      }
    );

    if (res.data.success) {
    dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      setOpen(false);

    }
    

  } catch (error) {
    console.log(error);
    toast.error("failed to update profile");
    
  }

     finally {
    setLoading(false); // ✅ ALWAYS stop loader
  }

    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
         setInput({...input,file});
    }


    return(

        
        

            <Dialog  open={open} onOpenChange={setOpen}>

  <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
                <DialogContent className="sm:max-w-[500px] bg-white border-none shadow-2xl rounded-xl"
  onInteractOutside={() => setOpen(false)}>

                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Edit Profile
                        </DialogTitle>
                         <DialogDescription>
        Update your personal details like name, email, and resume.
      </DialogDescription>
                    </DialogHeader>



                    {/**form for edit profile */}
                    <form onSubmit={handleSubmit}>

  {/**name */}
  <div className="grid gap-4 py-4">

    <div className="grid grid-cols-4 items-center gap-4">
      
      <label htmlFor="name" className="text-right font-medium">
        Name
      </label>

     <input
  type="text"
  value={input.fullname}
  name="fullname"
  onChange={changeEventHandler}
      className="col-span-3 border border-gray-300 rounded-md p-2"

/>
    </div>

{/* Email */}
<div className="grid grid-cols-4 items-center gap-4">
  
  <label htmlFor="email" className="text-right font-medium">
    Email
  </label>

  <input
    type="email"
    id="email"
    value={input.email}
    name="email"
    onChange={changeEventHandler}
    className="col-span-3 border border-gray-300 rounded-md p-2"
  />

</div>

{/* Phone */}
<div className="grid grid-cols-4 items-center gap-4">
  
  <label htmlFor="phone" className="text-right  font-medium">
    Phone Number
  </label>

  <input
  type="tel"
  value={input.phoneNumber}
  name="phoneNumber"
  onChange={changeEventHandler}
    className="col-span-3 border border-gray-300 rounded-md p-2"

/>

</div>



{/**bio */}

<div className="grid grid-cols-4 items-start gap-4">
  
  <label htmlFor="bio" className="text-right font-medium mt-2">
    Bio
  </label>

  <textarea
    id="bio"
    value={input.bio}

    name="bio"
    onChange={changeEventHandler}
    rows="3"
    placeholder="Enter your bio..."
    className="col-span-3 border border-gray-300 rounded-md p-2"
  />

</div>

{/**skills */}
<div className="grid grid-cols-4 items-center gap-4">
  
  <label htmlFor="skills" className="text-right font-medium">
    Skills
  </label>

  <input
    type="text"
    id="skills"
    value={input.skills}
    name="skills"
    onChange={changeEventHandler}
    placeholder="React, Node.js, MongoDB"
    className="col-span-3 border border-gray-300 rounded-md p-2"
  />

</div>

{/**resume upload file */}
<div className="grid grid-cols-4 items-center gap-4">
  
  <label htmlFor="resume" className="text-right font-medium">
    Resume
  </label>

  <input
    type="file"
    id="file"
    name="file"
    onChange={fileChangeHandler}
   
    accept="application/pdf"
    className="col-span-3 text-sm"
  />

</div>

  </div>

  <DialogFooter>
     
 {
 loading ? (
    <div className="flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
    </div>
  ) : (
    <button type="submit" className="w-full py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-black hover:bg-gray-900 rounded-md">
      Save
    </button>
  )
}

  </DialogFooter>
</form>
                </DialogContent>
            </Dialog>
            
        
    )
}

export default EditProfileModal ;