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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>List of candidates who applied for this job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Applied on</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Date</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <tr>
            <TableCell>Fullname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Applied On</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Date</TableCell>

            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal></MoreHorizontal>
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  {shortlistingStatus.map((status, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="radio"
                          name="shortlistingStatus"
                          value="status"
                        />
                        {""} {status}
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
