import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import React from "react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi","Mumbai","Kolkata","Chennai","Bangalore","Hyderabad","Pune","Remote"],
  },
  {
    filterType: "Industry",
    array: ["IT", "Finance", "Healthcare", "Education"],
  },
  {
    filterType: "Salary",
    array: ["0 - 5 LPA", "5 - 10 LPA", "10 - 20 LPA"],
  },
  {
    filterType: "Experience",
    array: ["Fresher", "1 Year", "2 Years"],
  },
];

const Filter = () => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="my-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          
          {/* Heading */}
          <h2 className="font-semibold text-md mb-2">
            {data.filterType}
          </h2>

          {/* ✅ Separate RadioGroup for each section */}
          <RadioGroup>
            {data.array.map((item, i) => (
              <div key={i} className="flex items-center space-x-2 mb-2">
                
                {/* radio */}
                <RadioGroupItem value={item} id={item} />

                {/* label */}
                <label htmlFor={item} className="text-sm cursor-pointer">
                  {item}
                </label>

              </div>
            ))}
          </RadioGroup>

        </div>
      ))}

    </div>
  );
};

export default Filter;