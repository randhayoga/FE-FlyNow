import { Separator } from "@/components/ui/separator";

import BookingLoading from "./BookingLoading";

import { format } from "date-fns";
import { id } from "date-fns/locale";

const BookingDetail = ({ booking, flight, isLoading }) => {
  const numAdults = booking?.numAdults;
  const numChildren = booking?.numChildren;
  const numBabies = booking?.numBabies;

  const priceAdult = flight?.price * numAdults || 0;
  const priceChildren = flight?.price * numChildren || 0;
  const totalPrice = priceAdult + priceChildren;

  const formatTime = (time) => {
    return time
      ? format(new Date(time), "HH:mm", {
          locale: id,
        })
      : "";
  };

  const formatDate = (date) => {
    return date
      ? format(new Date(date), "dd MMMM yyyy", {
          locale: id,
        })
      : "";
  };

  return (
    <div className="font-bold">
      {!isLoading ? (
        <>
          <section>
            <div className="flex w-full justify-between items-center ">
              <p className="text-lg">{formatTime(flight?.departureTime)}</p>
              <p className="text-base text-color-primary">Keberangkatan</p>
            </div>
            <p className="font-normal">{formatDate(flight?.departureTime)}</p>
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
              <p className="capitalize">
                {flight?.airline?.airlineName} - {flight?.flightClass}
              </p>
              <p className="mb-4">{flight?.flightCode}</p>
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
            <p className="font-normal">{formatDate(flight?.departureTime)}</p>
            <p className="font-medium">{flight?.arrivalAirport?.airportName}</p>
          </section>
          <Separator className="my-4" />
          <section>
            <p>Rincian Harga</p>
            {numAdults > 0 && (
              <div className="flex w-full justify-between items-center font-normal">
                <p>
                  {numAdults} {numAdults > 1 ? "Adults" : "Adult"}
                </p>
                <p>IDR {priceAdult.toLocaleString("id-ID")}</p>
              </div>
            )}
            {numChildren > 0 && (
              <div className="flex w-full justify-between items-center font-normal">
                <p>
                  {numChildren} {numChildren > 1 ? "Children" : "Child"}
                </p>
                <p>IDR {priceChildren.toLocaleString("id-ID")} </p>
              </div>
            )}
            {numBabies > 0 && (
              <div className="flex w-full justify-between items-center font-normal">
                <p>
                  {numBabies} {numBabies > 1 ? "Babies" : "Baby"}
                </p>
                <p>IDR 0</p>
              </div>
            )}
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
        </>
      ) : (
        <BookingLoading />
      )}
    </div>
  );
};

export default BookingDetail;
