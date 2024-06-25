import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DestinasiFavoritHeader = () => {
  return (
    <div>
      <h1 className="text-xl font-bold my-6">Destinasi Favorit</h1>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex items-center w-full h-12 px-4 bg-color-primary rounded-xl text-white capitalize text-md">
          <Link to="/" className="mr-3">
            <ArrowLeft />
          </Link>
          Beranda
        </div>
      </div>
    </div>
  );
};

export default DestinasiFavoritHeader;
