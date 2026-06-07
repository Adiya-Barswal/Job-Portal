import React, { useEffect, useState } from "react";

import FilterCard from "./FilterCard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // SAFE INITIAL STATE
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    // agar search empty hai to saari jobs dikhao
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs || []);
      return;
    }

    // filtering
    const query = searchedQuery.toLowerCase();
    const filteredJobs = (allJobs || []).filter((job) => {
      return (
        job.title?.toLowerCase().includes(query) ||
        job.description?.toLowerCase().includes(query) ||
        job.location?.toLowerCase().includes(query) ||
        job.experienceLevel?.toLowerCase().includes(query) ||
        job.salary?.toString().includes(query)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          {/* FILTER SECTION */}
          <div className="w-1/5">
            <FilterCard />
          </div>

          {/* JOB SECTION */}
          {filterJobs?.length <= 0 ? (
            <span className="text-lg text-gray-500">Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
