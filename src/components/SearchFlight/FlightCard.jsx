import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const FlightCard = ({ flight, expandedCard, toggleExpand, ButtonHandler }) => {
  return (
    <Card key={flight.id} className="w-full shadow-md mb-5">
      <div className="p-8">
        <div className="flex justify-between items-center pb-3">
          <div className="capitalize md:text-lg font-semibold flex items-center">
            <img
              src={flight?.airline?.image}
              alt="airlines logo"
              className="w-6 me-2"
            />{" "}
            {flight.airline.airlineName} - {flight.flightClass}
          </div>
          <button
            className=" border-2 rounded-full p-1"
            onClick={() => toggleExpand(flight.id)}
          >
            {expandedCard === flight.id ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-md flex flex-col items-center">
            <p className="font-bold">
              {new Date(flight.departureTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="uppercase font-semibold">
              {flight.departureAirport.airportCode}
            </p>
          </div>
          <div className="w-96 flex flex-col items-center text-gray-500 px-3">
            <p>
              {Math.floor(
                (new Date(flight.arrivalTime) -
                  new Date(flight.departureTime)) /
                  (1000 * 60 * 60)
              )}
              h{" "}
              {Math.floor(
                (new Date(flight.arrivalTime) -
                  new Date(flight.departureTime)) /
                  (1000 * 60)
              ) % 60}
              m
            </p>
            <div className="border-t-2 w-full border-gray-300"></div>
            <p>Direct</p>
          </div>
          <div className="text-md flex flex-col items-center">
            <p className="font-bold">
              {new Date(flight.arrivalTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="uppercase font-semibold">
              {flight.arrivalAirport.airportCode}
            </p>
          </div>
          <div className="flex flex-col items-center ps-3 w-40">
            <p className="sm:text-lg font-bold text-color-primary pb-2 ms-auto whitespace-nowrap">
              IDR {new Intl.NumberFormat("id-ID").format(flight.price)}
            </p>
            <Button
              className="bg-color-primary hover:bg-hover-primary rounded-lg ms-auto md:text-lg w-24"
              onClick={() => ButtonHandler(flight)}
            >
              Pilih
            </Button>
          </div>
        </div>
        {expandedCard === flight.id && (
          <div className="transition-all duration-500 delay-1000 ease-in-out">
            <div className="border-t-2 my-7 border-gray-300"></div>
            <p className="font-bold text-lg text-color-primary">
              Detail Penerbangan
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-md">
                  {new Date(flight.departureTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>
                  {new Date(flight.departureTime).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {flight.departureAirport.airportName} - Terminal{" "}
                  {flight.terminal}
                </p>
              </div>
              <div className="mb-auto text-color-primary font-bold">
                <p>Keberangkatan</p>
              </div>
            </div>
            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
            <div className="flex justify-start">
              <img
                src={flight?.airline?.image}
                alt="airlines logo"
                className="w-6 me-3 my-auto"
              />{" "}
              <div>
                <p className="capitalize font-bold">
                  {flight.airline.airlineName} - {flight.flightClass}
                </p>
                <p className="uppercase font-bold mb-2">{flight.flightCode}</p>
                <p className="font-bold">Informasi :</p>
                {flight?.information?.split(", ").map((info, index) => (
                  <p className="font-normal text-sm" key={index}>
                    {info}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-md">
                  {new Date(flight.arrivalTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>
                  {new Date(flight.arrivalTime).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>{flight.arrivalAirport.airportName}</p>
              </div>

              <div className="mb-auto text-color-primary font-bold">
                <p>Kedatangan</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FlightCard;
