import React from 'react'
import Job1 from './Job1';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {

  // ✅ FIX: hook call kiya — API se jobs aayengi
  useGetAllJobs();

  // ✅ FIX: Redux store se real jobs liye
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div>
      <div className='max-w-7xl mx-auto my-10'>
        {/* ✅ FIX: real jobs ki length */}
        <h1 className='font-bold text-xl my-10'>Search Result {allJobs.length}</h1>

        <div className='grid grid-cols-3 gap-4 mt-5'>
          {allJobs.map((job) => (
            // ✅ FIX: job prop pass kiya
            <Job1 key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Browse