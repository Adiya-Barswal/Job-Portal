import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Science",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
      "c++",
      "Rust",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white rounded-md p-4 shadow-md border">
      <h1 className="font-bold text-xl">Filter Jobs</h1>

      <hr className="my-3" />

      {/* SINGLE RADIO GROUP */}
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            <h2 className="font-semibold text-lg mb-2">{data.filterType}</h2>

            {data.array.map((item, indx) => {
              const itemId = `id-${index}-${indx}`;

              return (
                <div key={itemId} className="flex items-center gap-3 py-1">
                  {/* RADIO BUTTON */}
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="h-4 w-4 border-2 border-black"
                  />

                  {/* LABEL */}
                  <label htmlFor={itemId} className="text-sm cursor-pointer">
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
