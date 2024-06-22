import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import BookingLoading from "./BookingLoading";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CgArrowsV } from "react-icons/cg";

const BookingDetail = ({ booking, flight, isOpen, setIsOpen, title }) => {
  const [isLoading, setIsLoading] = useState(false);

  const adult = booking?.numAdults;
  const children = booking?.numChildren;
  const baby = booking?.numBabies;

  const priceAdult = flight?.price * adult || 0;
  const priceChildren = flight?.price * children || 0;
  const tax = 0.11 * (priceAdult + priceChildren);
  const totalPrice = priceAdult + priceChildren + tax;

  const formatTime = (time) => {
    return time
      ? format(new Date(time), "HH:mm", {
          locale: id,
        })
      : "";
  };

  const formatDate = (date) => {
    return date
      ? format(new Date(date), "dd MMM yyyy", {
          locale: id,
        })
      : "";
  };

  return (
    <div className="font-semibold">
      {!isLoading ? (
        <>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-5 mt-4 border-2 px-4 py-2 rounded-md"
          >
            <CollapsibleTrigger>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold tracking-wide text-base text-color-primary">
                  {title}
                </h1>
                <CgArrowsV className="text-lg text-gray-400" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <section>
                <div className="flex w-full justify-between items-center ">
                  <p className="text-lg">{formatTime(flight?.departureTime)}</p>
                  <p className="text-base text-color-primary">Keberangkatan</p>
                </div>
                <p className="font-normal">
                  {formatDate(flight?.departureTime)}
                </p>
                <p className="font-medium">
                  {flight?.departureAirport?.airportName} - Terminal{" "}
                  {flight?.terminal}
                </p>
              </section>
              <Separator className="my-4" />
              <section className="flex w-full gap-2">
                <div className="flex w-6 justify-center items-center">
                  <img src={flight?.airline?.image} className="w-6" />
                </div>
                <div className="flex-grow  ">
                  <p>
                    {flight?.airline?.airlineName} - {flight?.flightClass}
                  </p>
                  <p className="mb-4">
                    {flight?.flightCode}
                    {/* {flight?.flightCode?.replace(/([A-Za-z]+)(\d+)/, "$1 - $2")} */}
                  </p>
                  <p>Informasi:</p>
                  {flight?.information.split(", ").map((info, index) => (
                    <p className="font-normal text-base" key={index}>
                      {info}
                    </p>
                  ))}
                </div>
              </section>
              <Separator className="my-4" />
              <section>
                <div className="flex w-full justify-between items-center  ">
                  <p className="text-lg">{formatTime(flight?.arrivalTime)}</p>
                  <p className="text-base text-color-primary">Kedatangan</p>
                </div>
                <p className="font-normal">
                  {formatDate(flight?.departureTime)}
                </p>
                <p className="font-medium">
                  {flight?.arrivalAirport?.airportName}
                </p>
              </section>
              <Separator className="my-4" />
              <section>
                <p>Rincian Harga</p>
                <div className="flex w-full justify-between items-center">
                  <p>
                    {adult} {adult > 1 ? "Adults" : "Adult"}
                  </p>
                  <p>IDR {priceAdult.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p>
                    {children} {children > 1 ? "Children" : "Child"}
                  </p>
                  <p>IDR {priceChildren.toLocaleString("id-ID")} </p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p>
                    {baby} {baby > 1 ? "Babies" : "Baby"}
                  </p>
                  <p>IDR 0</p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p>Tax</p>
                  <p>IDR {tax.toLocaleString("id-ID")}</p>
                </div>
                <Separator className="my-4" />
                <section>
                  <div className="flex w-full justify-between items-center">
                    <p>Total</p>
                    <p className="text-xl font-bold text-color-primary">
                      IDR {totalPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                </section>
              </section>
            </CollapsibleContent>
          </Collapsible>
        </>
      ) : (
        <BookingLoading />
      )}
    </div>
  );
};

export default BookingDetail;
