import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  //  Redux se single company
  const { singleCompany } = useSelector((store) => store.company);

  useEffect(() => {
    //  same company already loaded
    if (singleCompany?._id === companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_ENDPOINT}/get/${companyId}`,
          { withCredentials: true },
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (companyId) fetchSingleCompany();
  }, [companyId, dispatch, singleCompany]);
};

export default useGetCompanyById;
