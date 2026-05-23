import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { CgWebsite } from "react-icons/cg";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

function CompanySetup() {
  const [input, SetInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const params = useParams();

  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);

  const changeEventHandler = (event) => {
    SetInput({ ...input, [event.target.name]: event.target.value });
  };

  const fileChangeHandeler = (event) => {
    const file = event.target.files?.[0];
    SetInput({ ...input, file });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    {
      /* ✅ FormData */
    }
    const formData = new FormData();
    formData.append("companyName", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    SetInput({
      name: singleCompany?.companyName || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-600 font-semibold"
              variant="outline"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-bold text-blue-600">Company Setup </h1>
          </div>

          {/**name and input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              ></Input>
            </div>

            {/**2nd */}
            <div>
              <Label>Company Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              ></Input>
            </div>

            {/*3rd */}
            <div>
              <Label>Company website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              ></Input>
            </div>

            {/*4th */}
            <div>
              <Label>Company Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              ></Input>
            </div>

            {/*5th */}
            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={fileChangeHandeler}
              ></Input>
            </div>
          </div>

          {/* ✅ Buttons submit and update  */}
          {/* ✅ Update Button */}
          <div className="mt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-black text-white font-semibold py-2 rounded-sm"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
