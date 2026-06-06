import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  //  Redux se data liya
  const { allAdminJobs } = useSelector((store) => store.job);

  useEffect(() => {
    //  Guard condition
    if (allAdminJobs.length > 0) return;

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
  }, [dispatch, allAdminJobs]);
};

export default useGetAllAdminJobs;
