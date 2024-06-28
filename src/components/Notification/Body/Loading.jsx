import React from "react";

const LoadingCard = () => {
  return (
    <div className="card-container flex flex-col gap-2 my-2 p-4 rounded-lg animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-[60rem]"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-0">
        <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-full mt-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mt-2"></div>
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-gray-300 h-6 w-6 rounded"></div>
          <div className="bg-gray-300 h-6 w-6 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
