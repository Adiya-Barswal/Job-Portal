import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Badge } from "../ui/badge";
import ApplicantsTable from "./ApplicantsTable";
import { TbCactus } from "react-icons/tb";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
          { withCredentials: true },
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job)); // ✅ Redux update
        }
      } catch (error) {
        console.log(error); // ✅ catch ke andar
      }
    };

    fetchAllApplicants(); // ✅ call kiya
  }, []);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-5">
        Applicants{applicants?.applications?.length}
      </h1>

      {/**Applicants table */}
      <ApplicantsTable></ApplicantsTable>
    </div>
  );
};

export default Applicants;
