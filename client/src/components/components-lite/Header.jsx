import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOffice } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query)); //  Redux mein save
    navigate("/browse"); // ✅ browse page pe jayega
  };

  return (
    <div>
      <div className="flex flex-col gap-5 my-10">
        <div className="text-center">
          <div className="flex flex-col gap-5 my-10">
            <span className="flex items-center gap-2 px-4 mx-auto py-2 rounded-full bg-gray-200 text-red-600 font-medium">
              <PiBuildingOffice className="text-[#614232]" /> No.1 Job Hunt
              Website
            </span>
          </div>

          <h2 className="text-5xl font-bold mt-4">
            Search, Apply & <br />
            Get Your <span className="text-[#6A38C2]">Dream Job</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Start your hunt for the best, life-changing career opportunities
            from here in your <br />
            selected areas conveniently and get hired quiclky.
          </p>

          {/* for input */}
          <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto  mt-8">
            <input
              type="text"
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)} //  value track
            />
            {/*button*/}
            <button
              onClick={searchJobHandler} //  search handler
              className="bg-black text-white px-4 h-12 flex items-center justify-center rounded-r-full"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
