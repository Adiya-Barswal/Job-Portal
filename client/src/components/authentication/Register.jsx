import React, { useState } from 'react'

//import { Label } from 'radix-ui'
//import { Input } from 'postcss'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'




const Register = () => {
  const [input, setInput]= useState({
    fullName:"",
    email:"",
    password:"",
    role:"",
    phoneNumber:"",
    file:""
  });

  const navigate= useNavigate();

//
  const { loading } =useSelector((store =>store.auth));
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const changeFileHandler = (e) => {

    setInput({...input, file:e.target.files?.[0]}); 

  };

  const submitHandler=  async (e) => {
    e.preventDefault();
    console.log(input);

    // register
    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);

    if (input.file){
    formData.append("file", input.file);
    }

  
  
    try {

        //
            dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/register` , formData,{
        headers: {
  "Content-Type": "multipart/form-data",
}, 
         withCredentials: true,
    });

      if(res.data.success){
navigate("/login");

        toast.success(res.data.message);
      }

    } catch (error) {

      console.log(error);
      //
      console.log(error.response?.data?.message); // ✅ FIX: spelling + safe access
      toast.error(error.response?.data?.message || "Something went wrong");


    }

    finally{
      dispatch(setLoading(false));
    
    }
  };

  return (
    <div>
      

    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      
      {/*className='w-1/2 border border-gray-500 rounded-md p-4 my-10 */}
      <form 
      onSubmit={submitHandler}
       className="w-1/2 border border-gray-500 rounded-md p-4 my-10 ">
        <h1 className="font-bold text-xl mb-5  text-center text-blue-500 ">Register</h1>
        {/*Name*/}
        <div className='my-2'>
          <Label>Fullname</Label>
          <Input type="text" value={input.fullName} name="fullName" onChange={changeEventHandler} placeholder="john doe"   className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"></Input>
        </div>

        {/*email*/}
          <div className='my-2'>
          <Label>Email</Label>
          <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="johndoe@gmail.com"   className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"></Input>
        </div>

        {/*password*/}
          <div className='my-2'>
          <Label>Password</Label>
          <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="*************"  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"></Input>
        </div>

        {/*phone Number*/}
          <div className='my-2'>
          <Label>Phone Number</Label>
          <Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="+1234567890"  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"></Input>
        </div>



        {/* Radio button for student or recruiter*/}
        <div className="flex items-center justify-between">
          
            
    <RadioGroup className="flex items-center gap-4 my-5 ">
      <div className="flex items-center gap-3">
        <input type="radio" 
        name="role" 
        value="student" 

        //
        checked={input.role==="student"}
        onChange={changeEventHandler}
        className="cursor-pointer"/>
        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center gap-3">
         <input type="radio" 
         name="role" 

         //
         value="recruiter" 
         checked={input.role==="recruiter"}
        onChange={changeEventHandler}
         className="cursor-pointer"/>
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
    </div>
    
    {/*prfile photo */}
    <div className='flex items-center gap-2'>
    <Label>Profile Photo</Label>
    <Input type="file" accept="image/*"  onChange={changeFileHandler} className="cursor-pointer"/>
</div>  


{ /* loading true loder show and loading false then button show */}

{
 loading ? (
    <div className="flex items-center justify-center my-10">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
    </div>
  ):(
       <button type="submit"
        className="w-full my-3 bg-black text-white py-2 rounded-md mt-4 hover:bg-gray-800 transition-all duration-200"
        >
  Register
</button>

  )}



{/*allready account then login */}
<p className='text-gray-500 text-md my-2'>
  Allready have an account?<Link to="/login" className='text-blue-700 font-semibold'>Login</Link>
</p>

      </form>
    </div>
    </div>
  )
}

export default Register
