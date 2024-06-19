import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Card } from "@/components/ui/card";

const SelectedFlightCard = ({
  selectedDepartureFlight,
  toggleExpand,
  expandedCard,
}) => {
  return (
    <Card key={selectedDepartureFlight.id} className="w-full shadow-md mb-5">
      <div className="p-8">
        <div className="flex justify-between items-center pb-3">
          <div className="capitalize md:text-lg font-semibold flex items-center">
            <img
              src={selectedDepartureFlight.airline.image}
              alt="airlines logo"
              className="w-6 me-2"
            />{" "}
            {selectedDepartureFlight.airline.airlineName} -{" "}
            {selectedDepartureFlight.flightClass}
          </div>
          <button
            className="border-2 rounded-full p-1"
            onClick={() => toggleExpand(selectedDepartureFlight.id)}
          >
            {expandedCard === selectedDepartureFlight.id ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-md flex flex-col items-center">
            <p className="font-bold">
              {new Date(
                selectedDepartureFlight.departureTime
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="uppercase font-semibold">
              {selectedDepartureFlight.departureAirport.airportCode}
            </p>
          </div>
          <div className="w-96 flex flex-col items-center text-gray-500 px-3">
            <p>
              {Math.floor(
                (new Date(selectedDepartureFlight.arrivalTime) -
                  new Date(selectedDepartureFlight.departureTime)) /
                  (1000 * 60 * 60)
              )}
              h{" "}
              {Math.floor(
                (new Date(selectedDepartureFlight.arrivalTime) -
                  new Date(selectedDepartureFlight.departureTime)) /
                  (1000 * 60)
              ) % 60}
              m
            </p>
            <div className="border-t-2 w-full border-gray-300"></div>
            <p>Direct</p>
          </div>
          <div className="text-md flex flex-col items-center">
            <p className="font-bold">
              {new Date(selectedDepartureFlight.arrivalTime).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}
            </p>
            <p className="uppercase font-semibold">
              {selectedDepartureFlight.arrivalAirport.airportCode}
            </p>
          </div>
          <div className="flex flex-col items-center ps-3 w-40">
            <p className="sm:text-lg font-bold text-color-primary ms-auto whitespace-nowrap">
              IDR{" "}
              {new Intl.NumberFormat("id-ID").format(
                selectedDepartureFlight.price
              )}
            </p>
          </div>
        </div>
        {expandedCard === selectedDepartureFlight.id && (
          <div className="transition-all duration-500 delay-1000 ease-in-out">
            <div className="border-t-2 my-7 border-gray-300"></div>
            <p className="font-bold text-lg text-color-primary">
              Detail Penerbangan
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-md">
                  {new Date(
                    selectedDepartureFlight.departureTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>
                  {new Date(
                    selectedDepartureFlight.departureTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {selectedDepartureFlight.departureAirport.airportName} -
                  Terminal {selectedDepartureFlight.terminal}
                </p>
              </div>
              <div className="mb-auto text-color-primary font-bold">
                <p>Keberangkatan</p>
              </div>
            </div>
            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
            <div className="flex justify-start">
              <img
                src={selectedDepartureFlight.airline.image}
                alt="airlines logo"
                className="w-6 me-3 my-auto"
              />{" "}
              <div>
                <p className="capitalize font-bold">
                  {selectedDepartureFlight.airline.airlineName} -{" "}
                  {selectedDepartureFlight.flightClass}
                </p>
                <p className="uppercase font-bold mb-2">
                  {selectedDepartureFlight.flightCode}
                </p>
                <p className="font-bold">Informasi :</p>
                {selectedDepartureFlight.information
                  .split(", ")
                  .map((info, index) => (
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
                  {new Date(
                    selectedDepartureFlight.arrivalTime
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <p>
                  {new Date(
                    selectedDepartureFlight.arrivalTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>{selectedDepartureFlight.arrivalAirport.airportName}</p>
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

export default SelectedFlightCard;
