import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Header = ({ searchParams, totalPassengers }) => {
  return (
    <>
      <h1 className="text-xl font-bold mt-20 mb-5">Pilih Penerbangan</h1>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="flex items-center w-full h-12 px-4 bg-color-primary rounded-lg text-white capitalize text-md">
          <Link to="/" className="mr-3">
            <ArrowLeft />
          </Link>
          {searchParams.get("da")} - {searchParams.get("aa")} -{" "}
          {totalPassengers} Penumpang - {searchParams.get("class")}
        </div>
        <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4">
          <Link to="/">
            <Button className="bg-[#43b027] hover:bg-[#338021] w-full sm:w-56 h-12 rounded-lg text-md">
              Ubah Pencarian
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
