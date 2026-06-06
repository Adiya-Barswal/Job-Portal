import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Artificial Engineer",
  "Machine Learning Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "Graphic Designer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Mobile Developer",
  "Video Editor",
];

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query)); //  Redux mein save
    navigate("/browse"); //  browse page pe jayega
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-gray-600">
          Explore our extensive job market
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true, //is se end hone per wapas start ho jaayega
          dragFree: true, // es se scroll ekdam smooth (free) move karega
        }}
        className="w-full max-w-xl mx-auto my-10  "
      >
        <CarouselContent>
          {category.map((category, index) => (
            <CarouselItem key={index} className=" lg:basis-1/3">
              <div className="p-1">
                {" "}
                {/*ye extra space ke liye */}
                <div className="flex flex-col items-center gap-3">
                  <Button
                    onClick={() => searchJobHandler(category)}
                    className="rounded-full bg-black text-white  px-4 py-2"
                  >
                    {category}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
