import React from "react";
import loading from "@/assets/searchFlight/loading.png";

const Loading = () => {
  return (
    <div className="font-semibold flex flex-col items-center justify-center text-center">
      <p className=" text-gray-400">Mencari Penerbangan Terbaik...</p>
      <img src={loading} alt="loading" className=" w-60 py-4" />
    </div>
  );
};

export default Loading;
