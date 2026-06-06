import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { setCompanies } from "@/redux/companySlice";

function CompaniesTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );

  const [filter, setFilter] = useState([]);

  // Search Filter
  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;

      return company?.companyName
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilter(filteredCompany);
  }, [companies, searchCompanyByText]);

  // Delete Company
  const deleteCompany = async (id) => {
    try {
      const res = await axios.delete(`${COMPANY_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        // Redux update
        const updatedCompanies = companies.filter(
          (company) => company._id !== id,
        );

        dispatch(setCompanies(updatedCompanies));
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to delete company");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Your recent registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filter.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filter.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                    <AvatarFallback>
                      {company?.companyName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell>{company.companyName}</TableCell>

                <TableCell>{company.createdAt?.split("T")[0]}</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-40 bg-white border shadow-md">
                      <div className="flex flex-col gap-2">
                        {/* Edit button*/}
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </div>

                        {/* Delete */}
                        <div
                          onClick={() => deleteCompany(company._id)}
                          className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 p-2 rounded"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
