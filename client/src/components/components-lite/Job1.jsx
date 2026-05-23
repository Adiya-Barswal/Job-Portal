import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, BookMarked } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useNavigate } from 'react-router-dom'

const Job1 = ({ job }) => {

  const {
    company,
    title,
    description,
    position,
    salary,
    location,
    jobType,
  } = job || {};

  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-400">

      <div className='flex items-center justify-between'>
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          onClick={() => setIsBookmarked(!isBookmarked)}
          variant='outline'
          className="rounded-full"
          size='icon'
        >
          {isBookmarked ? <BookMarked className="text-[#6B3AC2]" /> : <Bookmark />}
        </Button>
      </div>

      <div className='flex items-center gap-3 my-2'>
        <Button className="p-6" variant='outline' size='icon'>
          <Avatar>
            <AvatarImage src={company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">{company?.name}</h1>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg my-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-600 font-bold" variant="ghost">{position} Position</Badge>
        <Badge className="text-[#FA4F09] font-bold" variant="ghost">{salary} LPA</Badge>
        <Badge className="text-black font-bold" variant="ghost">{jobType}</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        {/* ✅ FIX: syntax error fix kiya — curly brace sahi jagah */}
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant='outline'
          className="font-bold rounded-sm"
        >
          Details
        </Button>
        <Button
          variant='outline'
          className="bg-[#6B3AC2] text-white font-bold rounded-sm hover:bg-white hover:text-[#6B3AC2] transition-all duration-200"
        >
          Save For Later
        </Button>
      </div>

    </div>
  );
};

export default Job1