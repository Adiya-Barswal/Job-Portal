import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName },
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        //  Company create hone ke baad edit page pe jayenge
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 ">
      {/* Heading */}
      <div className="my-10">
        <h1 className="font-bold text-2xl">Your Company Name</h1>

        {/*paragraph */}
        <p className="text-gray-500">
          What would you like to give your company name? You can change this
          later.
        </p>
      </div>

      {/* Input */}
      <div>
        <label className="font-medium">Company Name</label>
        <Input
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 my-5">
        <Button variant="outline" onClick={() => navigate("/admin/companies")}>
          Cancel
        </Button>
        <Button
          onClick={registerCompany}
          className="bg-black text-white hover:bg-gray-800"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default CompanyCreate;
