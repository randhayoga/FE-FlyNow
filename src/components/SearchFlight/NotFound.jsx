import React from "react";
import notFound from "@/assets/searchFlight/notFound.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="font-semibold flex flex-col items-center justify-center text-center">
      <img src={notFound} alt="not found" className=" w-72 py-4" />
      <p>Maaf, pencarian Anda tidak ditemukan</p>
      <Link to="/" className="text-color-primary">
        Coba cari perjalanan lainnya!
      </Link>
    </div>
  );
};

export default NotFound;
