import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAppliedJobs } from "@/redux/ApplicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/getapplied`, {
          withCredentials: true,
        });

        console.log("api hit", res.data);

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;
