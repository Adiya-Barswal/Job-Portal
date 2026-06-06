import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.application);
  return (
    <div>
      <Table>
        <TableCaption>Recent Applied Jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 font-bold"
              >
                Please apply for a job first
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((allAppliedJob) => (
              <TableRow key={allAppliedJob._id}>
                <TableCell>{allAppliedJob?.createdAt?.split("T")[0]}</TableCell>

                <TableCell>{allAppliedJob?.job?.title}</TableCell>

                <TableCell>
                  {allAppliedJob?.job?.company?.companyName}
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`rounded-lg px-4 py-2 text-white
    ${
      allAppliedJob?.status === "accepted"
        ? "bg-green-500"
        : allAppliedJob?.status === "rejected"
          ? "bg-red-500"
          : "bg-gray-500"
    }`}
                  >
                    {allAppliedJob?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
