import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Companies() {
  const navigate = useNavigate();
  useGetAllCompanies();

  const [input, SetInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="max-w-6xl mx-auto my-10 ">
      {/* Top bar */}
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by Name"
          onChange={(e) => SetInput(e.target.value)}
        />
        <Button
          onClick={() => navigate("/admin/companies/create")}
          className="bg-black text-white hover:bg-gray-800"
        >
          Add Company
        </Button>
      </div>

      <div>
        {/* Table */}
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
