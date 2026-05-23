import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs)); // ✅ Redux store mein save
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [dispatch]); // ✅ sirf ek baar chalega
};

export default useGetAllJobs;