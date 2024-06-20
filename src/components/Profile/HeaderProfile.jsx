import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HeaderProfile = () => {
  return (
    <div className="mt-10">
      <h1 className="text-lg font-bold my-6">Akun</h1>
      <button
        type="button"
        className="flex items-center w-full h-12 px-4 bg-color-primary rounded-lg text-white capitalize text-md"
      >
        <Link to="/" className="mr-3">
          <ArrowLeft />
        </Link>
        Beranda
      </button>
    </div>
  );
};

export default HeaderProfile;
