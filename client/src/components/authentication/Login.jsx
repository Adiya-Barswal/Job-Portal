import React, { useState } from 'react'
import Navbar from '../components-lite/Navbar'
//import { Label } from 'radix-ui'
//import { Input } from 'postcss'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/data'
import axios from 'axios'
import { toast } from 'sonner'
import {  useDispatch, useSelector } from 'react-redux'
import {setUser , setLoading } from '@/redux/authSlice'
import { Button } from '../ui/button'
import { Loader, Loader2 } from 'lucide-react'



const Login = () => {
//functionality
const [input, setInput]= useState({
    
    email:"",
    password:"",
    role:""
  });
//
  const navigate = useNavigate();

// dispatch 
  const dispatch = useDispatch();
  const { loading } = useSelector((store =>store.auth));

  

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }


  
  const submitHandler=  async (e) => {
    e.preventDefault();
    

    // for login
    try {

      //
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_ENDPOINT}/login` , input,{
        headers: {
  "Content-Type": "application/json",
},
         withCredentials: true,
      });

      if(res.data.success){
// user ka data redux mai store karne ke liye res.data.user 

dispatch(setUser(res.data.user));

navigate("/");

        toast.success(res.data.message);
      }

    } catch (error) {

      console.log(error);
      //
         console.log(error.response?.data?.message); // ✅ FIX
      toast.error(error.response?.data?.message || "Login failed");

    }
//

finally{
  dispatch(setLoading(false));

}

  };



  return (
    <div>
      <Navbar></Navbar>

    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      
      {/*className='w-1/2 border border-gray-500 rounded-md p-4 my-10 */}
      <form 
      onSubmit={submitHandler}
      className="w-1/2 border border-gray-500 rounded-md p-4 my-10 ">
        <h1 className="font-bold text-xl mb-5  text-center text-blue-500 ">Login</h1>
        
        {/*email*/}
          <div className='my-2'>
          <Label>Email</Label>
          <Input type="email"  value={input.email} name="email" onChange={changeEventHandler} placeholder="johndoe@gmail.com"   className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"></Input>
        </div>

        {/*password*/}
          <div className='my-2'>
          <Label>Password</Label>
          <Input type="password"  value={input.password} name="password" onChange={changeEventHandler} placeholder="*************"  className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black"></Input>
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
          value="recruiter" 
          //
         
         checked={input.role==="recruiter"}
        onChange={changeEventHandler}
          className="cursor-pointer"/>
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
    </div>

   { /* loading true loder show and loading false then button show */}
   
 
 {
 loading ? (
    <div className="flex items-center justify-center my-10">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
    </div>
  ) : (
    <button className="w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-600 hover:bg-blue-800/90 rounded-md">
      Login
    </button>
  )
}



{/*no account */}
<div>
<p className='text-gray-700 text-center my-2'>
  Create  new Account {""} <Link 
  to="/register" 
  className="block w-1/2 mx-auto text-center bg-green-600 text-white py-2 rounded-md mt-4 hover:bg-green-800"
>
  Register
</Link>
  {/* <Link to="/Register" className='text-blue-700'>
   <button className="w-1/2 my-3 bg-green-600 text-white flex items-center justify-center max-w-7xl mx-auto py-2 rounded-md mt-4 hover:bg-green-800 transition-all duration-200">
  Register
</button>
  </Link> */}
</p>
</div>

      </form>
    </div>
    </div>
  )
}

export default Login;
