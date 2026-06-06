import React, { useEffect } from "react";

import Header from "./Header";
import Categories from "./Categories";
import LatestJob from "./LatestJob";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  // multiple api calling from useGetAllJobs so removeh hook only used App.jsx();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  return (
    <div>
      <Header />
      <Categories />
      <LatestJob />
    </div>
  );
}

export default Home;
