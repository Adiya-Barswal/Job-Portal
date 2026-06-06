import React, { useEffect } from "react";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";

import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  const dispatch = useDispatch();
  // multiple api calling from useGetAllJobs so removeh hook only used App.jsx();
  // Redux store se real jobs liye
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Result {allJobs.length}
        </h1>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {allJobs.map((job) => (
            // job prop pass kiya
            <Job1 key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
