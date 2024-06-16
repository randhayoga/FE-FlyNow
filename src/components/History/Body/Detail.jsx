import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CgArrowsV } from "react-icons/cg";
import { GoArrowLeft } from "react-icons/go";
import { GiCommercialAirplane } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { PaymentBadge } from "@/components/ui/paymentBadge";

function Detail({ currentHistory, modal, setModal }) {
  return (
    <div
      className={`${
        modal === true ? `fixed z-50` : `hidden -z-50`
      } currentHistory top-0 duration-300 transition-all ease-in overflow-auto h-screen lg:h-auto left-0 lg:static lg:w-auto w-screen lg:col-span-1 p-6 bg-white shadow-xl lg:shadow-none lg:z-auto`}
    >
      <GoArrowLeft
        className="lg:hidden static mb-6 cursor-pointer text-3xl"
        onClick={() => {
          setModal(false);
        }}
      />
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Detail</div>
        <PaymentBadge
          variant={
            currentHistory.payment?.paymentStatus == "paid"
              ? "success"
              : currentHistory.payment?.paymentStatus == "unpaid"
              ? "destructive"
              : "secondary"
          }
        >
          {currentHistory.payment?.paymentStatus[0].toUpperCase() +
            currentHistory.payment?.paymentStatus.slice(1)}
        </PaymentBadge>
      </div>
      <div className="booking-code text-base flex">
        <div className="label">
          Kode pemesanan:{" "}
          <span className="code font-semibold text-color-primary">
            {currentHistory.bookingCode}
          </span>
        </div>
      </div>
      <Collapsible className="mt-4 border-2 px-4 py-2 rounded-md">
        <CollapsibleTrigger className=" w-full">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-base text-color-primary">
              Penerbangan {currentHistory.returnFlightId !== null ? "Awal" : ""}
            </div>
            <CgArrowsV className="text-lg text-gray-400" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="first-flight">
            <div className="mb-4">
              <div className="flex items-center justify-between mt-4">
                <div className="font-semibold">
                  {new Date(
                    currentHistory.flight.departure.departureTime
                  ).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs font-semibold text-color-primary">
                  Keberangkatan
                </div>
              </div>
              <div className="departure-time">
                {new Date(
                  currentHistory.flight.departure.departureTime
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="">
                {currentHistory.flight.departure?.departureAirport?.airportName}{" "}
                - Terminal {currentHistory.flight.departure.terminal}
              </div>
            </div>
            <div className="py-2 flex items-center gap-4 border-t-2">
              <div className="flight-logo text-2xl text-yellow-500">
                <GiCommercialAirplane />
              </div>
              <div className="flex flex-col">
                <div className="flight font-semibold pb-4">
                  <div className="">
                    {currentHistory.flight.departure.airline.airlineName}
                  </div>
                  <div className="">
                    {currentHistory.flight.departure.airline.airlineCode}
                  </div>
                </div>
                <div className="passengers">
                  <div className="text-semibold">Informasi:</div>
                  {currentHistory.details.departure.map((detail, index) => {
                    return (
                      <div key={index}>
                        <div className="text-color-primary">
                          Penumpang {index + 1}: {detail.passenger.name}
                        </div>
                        <div className="">ID: {detail.passenger.id}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="border-t-2 py-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">
                  {new Date(
                    currentHistory.flight.departure.arrivalTime
                  ).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs font-semibold text-color-primary">
                  Kedatangan
                </div>
              </div>
              <div className="arrival-time">
                {new Date(
                  currentHistory.flight.departure.arrivalTime
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="">
                {currentHistory.flight.departure.arrivalAirport.airportName}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      {currentHistory.returnFlightId !== null && (
        <Collapsible className="mt-4 border-2 px-4 py-2 rounded-md">
          <CollapsibleTrigger className=" w-full">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-base text-color-primary">
                Penerbangan Pulang
              </div>
              <CgArrowsV className="text-lg text-gray-400" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="first-flight">
              <div className="mb-4">
                <div className="flex items-center justify-between mt-4">
                  <div className="font-semibold">
                    {new Date(
                      currentHistory.flight.return.departureTime
                    ).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-xs font-semibold text-color-primary">
                    Keberangkatan
                  </div>
                </div>
                <div className="departure-time">
                  {new Date(
                    currentHistory.flight.return.departureTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="">
                  {currentHistory.flight.return?.departureAirport?.airportName}{" "}
                  - Terminal {currentHistory.flight.return.terminal}
                </div>
              </div>
              <div className="py-2 flex items-center gap-4 border-t-2">
                <div className="flight-logo text-2xl text-yellow-500">
                  <GiCommercialAirplane />
                </div>
                <div className="flex flex-col">
                  <div className="flight font-semibold pb-4">
                    <div className="">
                      {currentHistory.flight.return.airline.airlineName}
                    </div>
                    <div className="">
                      {currentHistory.flight.return.airline.airlineCode}
                    </div>
                  </div>
                  <div className="passengers">
                    <div className="text-semibold">Informasi:</div>
                    {currentHistory.details.return.map((detail, index) => {
                      return (
                        <div key={index}>
                          <div className="text-color-primary">
                            Penumpang {index + 1}: {detail.passenger.name}
                          </div>
                          <div className="">ID: {detail.passenger.id}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="border-t-2 py-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    {new Date(
                      currentHistory.flight.return.arrivalTime
                    ).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-xs font-semibold text-color-primary">
                    Kedatangan
                  </div>
                </div>
                <div className="arrival-time">
                  {new Date(
                    currentHistory.flight.return.arrivalTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="">
                  {currentHistory.flight.return.arrivalAirport.airportName}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="py-2">
        <div className="font-semibold">Rincian Harga</div>
        <div className="flex justify-between w-full">
          <div className="">{currentHistory.numAdults} Dewasa</div>
          <div className="">
            IDR{" "}
            {(
              (currentHistory.flight.departure?.price +
                (currentHistory.flight.arrival?.price || 0)) *
              currentHistory.numAdults
            ).toLocaleString("id-ID")}
          </div>
        </div>
        {currentHistory.numChildren > 0 && (
          <div className="flex justify-between w-full">
            <div className="">{currentHistory.numChildren} Anak-anak</div>
            <div className="">
              IDR{" "}
              {(
                (currentHistory.flight.departure?.price +
                  (currentHistory.flight.arrival?.price || 0)) *
                currentHistory.numChildren
              ).toLocaleString("id-ID")}
            </div>
          </div>
        )}
        {currentHistory.numBabies > 0 && (
          <div className="flex justify-between w-full">
            <div className="">{currentHistory.numBabies} Bayi</div>
            <div className="">
              IDR{" "}
              {(
                (currentHistory.flight.departure?.price +
                  (currentHistory.flight.arrival?.price || 0)) *
                currentHistory.numBabies
              ).toLocaleString("id-ID")}
            </div>
          </div>
        )}
        <div className="flex justify-between font-bold w-full my-3 items-center">
          <div className="">Total</div>
          <div className="text-color-primary text-lg">
            IDR {currentHistory.payment?.paymentAmount.toLocaleString("id-ID")}
          </div>
        </div>

        {currentHistory.payment?.paymentStatus === "paid" ? (
          <Button size="lg" variant="primary" className="w-full">
            Cetak Tiket
          </Button>
        ) : currentHistory.payment?.paymentStatus === "unpaid" ? (
          <Button disabled size="lg" variant="secondary" className="w-full">
            Cetak Tiket
          </Button>
        ) : (
          <Button size="lg" variant="primary" className="w-full">
            Lanjutkan pembayaran
          </Button>
        )}
      </div>
    </div>
  );
}

export default Detail;
