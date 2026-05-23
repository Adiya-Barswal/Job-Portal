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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const navigate = useNavigate();

  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );

  const [filter, setFilter] = useState(companies);

  // ✅ filter logic
  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) return true; // ✅ text nahi hai toh sab dikhao
        return company?.companyName
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilter(filteredCompany); // ✅ filter set kiya
  }, [companies, searchCompanyByText]);

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
          {/* ✅ filter use kiya — companies nahi */}
          {!filter || filter.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filter?.map((company) => (
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
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {/* ✅ navigate add kiya */}
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 p-2 rounded"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
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
