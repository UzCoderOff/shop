import React from "react";

const Badge = ({num}) => {
  return (
    <div className="absolute top-0 -right-1 bg-[red] w-auto h-4 rounded-full text-white text-center flex align-middle justify-center text-xs px-[5px]">
      {num}
    </div>
  );
};

export default Badge;
