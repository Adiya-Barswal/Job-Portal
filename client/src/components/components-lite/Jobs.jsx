import React from 'react';
import FilterCard from './FilterCard';
import Job1 from './Job1';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';



//const jobsArray = [1,2,3,4,5,6,7,8,9];


const Jobs = () => {

  useGetAllJobs()

  const {allJobs} = useSelector((store) => store.job);

  return (
    <div>
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
        {/**Filter card */}
        <div className='w-[20%]'>
          <FilterCard />
          </div>

      {/**Job card */}

      {allJobs?.length <= 0 ? (
              <span className='text-lg text-gray-500'> jobs not found </span>
          
          ) : (
          <div className='w-[80%] flex-1 h-[88vh] overflow-y-auto pb-5'>
         <div className='grid grid-cols-3 gap-4'>  
            {allJobs.map((job) => <Job1 key={job._id} job={job} />)}

          </div>
           </div>
          )}
      </div>
     
      </div>
    </div>
  )
}

export default Jobs
