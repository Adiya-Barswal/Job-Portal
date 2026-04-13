import React from 'react'
import JobCards from './JobCards';

const randomJobs =[1,2,3,4,5,6,7,8,9];

function LatestJob() {
  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h2 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top </span>Job Openinigs
        </h2>

        {/*job cards */}
        <div className='grid grid-cols-3 gap-4 my-5'>
             {
        
          randomJobs.slice(0,6).map((job, index) => (
            <JobCards key={index}></JobCards>
            
          ))
        }

        </div>
      

    </div>
  );
}

export default LatestJob
