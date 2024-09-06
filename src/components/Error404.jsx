import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const items = [{ label: "Home", url: "/" }, { label: "404 Error" }];

  return (
    <div className="relative flex align-middle justify-center items-center  min-h-screen p-4">
      <BreadCrumb model={items} className="absolute top-4 left-4 mb-8" />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-gray-800">
          404 Not Found
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">
          Your visited page not found. You may go home page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Back to home page
        </button>
      </div>
    </div>
  );
};

export default Error404;
