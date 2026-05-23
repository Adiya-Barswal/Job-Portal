import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useGetSingleJobs = (jobId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get/${jobId}`, // ✅ fix 1
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job)); // ✅ fix 2
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (jobId) fetchSingleJobs();
  }, [jobId, dispatch]); // ✅ fix 3
};

export default useGetSingleJobs;