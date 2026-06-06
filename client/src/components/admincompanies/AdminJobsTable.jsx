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
import { Edit2, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";

function AdminJobsTable({ searchJobByText }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allAdminJobs } = useSelector((store) => store.job);
  const [filter, setFilter] = useState([]);

  // FILTER LOGIC
  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length > 0
        ? allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;

            return (
              job?.title
                ?.toLowerCase()
                .includes(searchJobByText.toLowerCase()) ||
              job?.company?.companyName
                ?.toLowerCase()
                .includes(searchJobByText.toLowerCase())
            );
          })
        : [];

    setFilter(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // DELETE JOB
  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job deleted successfully");

        const updatedJobs = allAdminJobs.filter((job) => job._id !== id);

        //   redux action
        dispatch(setAllAdminJobs(updatedJobs));

        // UI update
        setFilter(updatedJobs);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

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
          {!filter || filter.length === 0 ? (
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

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32 bg-white shadow-lg border rounded-xl p-2">
                      {/* EDIT */}
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job?.company?._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>

                      {/* APPLICANTS */}
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>

                      {/* DELETE */}
                      <div
                        onClick={() => deleteJob(job._id)}
                        className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 p-2 rounded"
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
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
