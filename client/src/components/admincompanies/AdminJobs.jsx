import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

function AdminJobs() {
  /**hook call */
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  return (
    <div className="max-w-6xl mx-auto my-10 min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by Name & Jobs"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          onClick={() => navigate("/admin/jobs/create")}
          className="bg-black text-white hover:bg-gray-800"
        >
          Post New Job
        </Button>
      </div>

      {/* Table */}
      <AdminJobsTable searchJobByText={input} />
    </div>
  );
}

export default AdminJobs;
