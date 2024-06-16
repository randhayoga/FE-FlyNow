import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HeaderProfile = () => {
  return (
    <>
      <div className="w-full rounded-lg mt-10 sm:mt-10">
        <h1 className="text-xl font-bold px-4 sm:px-40 pt-4 md:pt-8">Akun</h1>
        <div className="px-4 sm:px-40">
          <button
            type="button"
            className="flex items-center w-full sm:w-5/6 h-12 my-2 p-4 bg-color-primary rounded-lg text-white"
          >
            <Link to="/" className="mr-3">
              <ArrowLeft />
            </Link>
            Beranda
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderProfile;
