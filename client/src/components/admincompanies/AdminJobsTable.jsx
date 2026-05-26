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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable({ searchJobByText }) {
  //  prop liya

  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);
  const [filter, setFilter] = useState(allAdminJobs);

  //  filter logic
  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length > 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.companyName
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilter(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>Your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!filter || filter.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            filter.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.companyName}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white shadow-lg border rounded-xl p-2">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job?.company?._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
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

export default AdminJobsTable;
