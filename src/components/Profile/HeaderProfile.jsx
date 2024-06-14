import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HeaderProfile = () => {
  return (
    <>
      <div className="w-screen rounded-lg   mt-12 border">
        <h1 className="text-lg font-bold pl-40 pt-8">Akun</h1>
        <div className="pl-40 ">
          <button
            type="button"
            className="flex items-center w-4/5 h-12 m-8 p-4  bg-ColorPrimary rounded-lg text-white"
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
