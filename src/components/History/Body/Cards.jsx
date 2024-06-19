import React from "react";
import { PaymentBadge } from "../../ui/paymentBadge";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";

function Cards({ histories, currentHistory, setCurrentHistory, setModal }) {
  return (
    <div className="histories col-span-2 bg-white">
      <div className="card-container flex flex-col gap-2">
        {histories.map((history, index) => {
          const departureDate = new Date(
            history.flight.departure.departureTime
          ).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const departureTime = new Date(
            history.flight.departure.departureTime
          ).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const arrivalDate = new Date(
            history.flight.departure.arrivalTime
          ).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          const arrivalTime = new Date(
            history.flight.departure.arrivalTime
          ).toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const departureTimeInt = new Date(
            history.flight.departure.departureTime
          );
          const arrivalTimeInt = new Date(history.flight.departure.arrivalTime);
          const durationInMiliseconds = arrivalTimeInt - departureTimeInt;
          const durationInHours = Math.floor(
            durationInMiliseconds / (1000 * 60 * 60)
          );
          const durationInMinutes = Math.floor(
            (durationInMiliseconds % (1000 * 60 * 60)) / (1000 * 60)
          );

          const durationText = `${durationInHours} Jam ${durationInMinutes} Menit`;

          return (
            <div
              className={`card p-4 border-2 rounded-md hover:border-color-primary cursor-pointer ${
                currentHistory?.id === history.id
                  ? "lg:border-color-primary"
                  : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentHistory(histories[index]);
                setModal(true);
              }}
            >
              <div className="payment-status">
                <PaymentBadge
                  variant={
                    history.payment?.paymentStatus == "paid"
                      ? "success"
                      : history.payment?.paymentStatus == "unpaid"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {history.payment?.paymentStatus[0].toUpperCase() +
                    history.payment?.paymentStatus.slice(1)}
                </PaymentBadge>
              </div>
              <div className="timeline py-4 flex gap-4 lg:gap-14">
                <div className="departure flex lg:flex-row flex-col gap-2">
                  <div className="pointer-icon text-gray-500 text-2xl">
                    <TbPlaneDeparture />
                  </div>
                  <div className="departure-text flex flex-col text-xs">
                    <div className="city mt-0 font-bold lg:text-base">
                      {history.flight.departure?.departureAirport?.city[0].toUpperCase() +
                        history.flight.departure?.departureAirport?.city.slice(
                          1
                        )}
                    </div>
                    <div className="date">{departureDate}</div>
                    {<div className="time">{departureTime}</div>}
                  </div>
                </div>
                <div className="flex-grow flex flex-col justify-center items-center">
                  <div className="duration text-xs lg:text-base text-gray-500">
                    {durationText}
                  </div>
                  <div className="arrow flex w-full items-center border border-gray-400"></div>
                </div>
                <div className="arrival flex lg:flex-row flex-col gap-2">
                  <div className="pointer-icon text-gray-500 text-2xl">
                    <TbPlaneArrival />
                  </div>
                  <div className="arrival-text flex text-xs flex-col">
                    <div className="city mt-0 font-bold lg:text-base">
                      {history.flight.departure.arrivalAirport.city[0].toUpperCase() +
                        history.flight.departure.arrivalAirport.city.slice(1)}
                    </div>
                    <div className="date">{arrivalDate}</div>
                    {<div className="time">{arrivalTime}</div>}
                  </div>
                </div>
              </div>
              <div className="details border-t-2 pt-3 text-xs lg:text-base flex items-center justify-between">
                <div className="booking-code">
                  <p className="font-semibold">Kode pemesanan:</p>
                  <p>{history.bookingCode}</p>
                </div>
                <div className="filght-class">
                  <p className="font-semibold">Kelas:</p>
                  <p>
                    {history.flight.departure.flightClass[0].toUpperCase() +
                      history.flight.departure.flightClass.slice(1)}
                  </p>
                </div>
                <div className="price">
                  <p className="font-bold text-color-primary lg:text-lg">
                    IDR {history.payment?.paymentAmount}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
