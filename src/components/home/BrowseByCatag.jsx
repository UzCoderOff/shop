import React from "react";
import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  const categories = [
    { name: "Phones", icon: Smartphone },
    { name: "Computers", icon: Monitor },
    { name: "SmartWatch", icon: Watch },
    { name: "Camera", icon: Camera },
    { name: "Headphones", icon: Headphones },
    { name: "Gaming", icon: Gamepad2 },
  ];

  return (
    <div className="pt-10 border-b-2">
      <h1 className="category-title">
        Categories
      </h1>
      <h1 className="pt-3 font-bold text-3xl pb-2">Browse By Category</h1>
      <div className="flex md:flex-row flex-col align-middle justify-evenly py-14">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link to={`/category/${category.name.toLowerCase()}`} key={index}>
              <div className="xl:w-40 xl:p-0 md:px-4 h-36 border-2 flex align-middle justify-center flex-col items-center hover:bg-primary transition-all duration-300 cursor-pointer hover:text-white">
                <Icon size={56} strokeWidth={1.25} />
                <h1>{category.name}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseByCategory;
