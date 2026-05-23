import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/admin`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
