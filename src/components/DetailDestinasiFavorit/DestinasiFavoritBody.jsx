import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card } from "@/components/ui/card";

const DestinasiFavoritBody = ({ favoriteFlight }) => {
  return (
    <div className="container flex flex-col md:flex-row py-7">
      <div className="w-full md:w-1/2 md:pe-10">
        <div className="relative">
          <div className="absolute top-3 right-0 flex items-center justify-end rounded-s-full py-1 px-5 bg-color-primary">
            <p className="text-sm font-semibold text-white">
              {favoriteFlight?.discount}
            </p>
          </div>
          <img
            src={favoriteFlight?.image}
            alt=""
            className="w-full rounded-xl object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-4 md:pt-0">
        <div className="flex text-xl font-bold items-center">
          <p>{favoriteFlight?.departureCity}</p>
          <div className="mx-3">
            <FaArrowRightLong />
          </div>
          <p>{favoriteFlight?.arrivalCity}</p>
        </div>
        <div className="flex justify-between font-semibold items-center py-5">
          <div>
            <p className="text-color-primary font-bold">
              {favoriteFlight?.airline}
            </p>
            <p>
              {new Date(favoriteFlight?.departureTime).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>
          <div className="bg-color-secondary rounded-xl py-2 px-7">
            <p>Mulai dari</p>
            <p className="text-xl font-bold text-alert-danger">
              IDR {new Intl.NumberFormat("id-ID").format(favoriteFlight?.price)}
            </p>
          </div>
        </div>
        <Card className="shadow-md w-full p-5 rounded-xl">
          <p className="text-justify">{favoriteFlight?.description}</p>
        </Card>
      </div>
    </div>
  );
};

export default DestinasiFavoritBody;
