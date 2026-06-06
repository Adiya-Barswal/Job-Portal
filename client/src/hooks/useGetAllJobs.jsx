import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  const { searchedQuery, allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    // Agar search empty hai aur jobs pehle se loaded hain
    if (
      (!searchedQuery || searchedQuery.trim() === "") &&
      allJobs?.length > 0
    ) {
      return;
    }

    const fetchAllJobs = async () => {
      try {
        const keyword = searchedQuery?.trim() || "";

        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get?keyword=${keyword}`,
          {
            withCredentials: true,
          },
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [dispatch, searchedQuery]);
};

export default useGetAllJobs;
