import React from "react";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="border-b-[1.5px] pb-4 pt-10 px-[9.3%]">
      <div className="flex flex-row align-middle justify-between">
        <h1 className="text-2xl font-bold font-sans">Exclusive</h1>
        <div className="flex flex-row align-middle justify-between">
          <a href="#" className="font-sans font-normal text-base text-black hover:text-gray-500 px-6">Home</a>
          <a href="#" className="font-sans font-normal text-base text-black hover:text-gray-500 px-6">Contact</a>
          <a href="#" className="font-sans font-normal text-base text-black hover:text-gray-500 px-6">About</a>
        </div>
        <div>
          <Search/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
