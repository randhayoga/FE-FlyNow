import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchFlight } from "../../redux/actions/flight";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { FaLeaf, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const SearchFlightPage = () => {
  const dispatch = useDispatch();
  const { flights } = useSelector((state) => state.flights);

  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    dispatch(searchFlight());
  }, [dispatch]);

  const toggleExpand = (flightId) => {
    setExpandedCard((prev) => (prev === flightId ? null : flightId));
  };

  return (
    <div>
      <div className="shadow-md py-4">
        <div className="container">
          <h1 className="text-xl font-bold">Pilih Penerbangan</h1>
          <div className="flex items-center w-90 p-4 bg-color-primary rounded-lg text-white">
            <Link to="/" className="mr-3">
              <ArrowLeft />
            </Link>
            JKT - MDN - 2 Penumpang - Economy
          </div>
        </div>
      </div>

      {/* flight detail card */}
      <div className="container py-7">
        {flights.departureFlights && flights.departureFlights.length > 0 ? (
          flights.departureFlights.map((flight) => (
            <Card key={flight.id} className="w-full shadow-md mb-4">
              <div className="p-7">
                <div className="flex justify-between items-center">
                  <div className="capitalize text-lg font-semibold flex items-center">
                    <FaLeaf className="mr-2" /> {flight.airline.airlineName} -{" "}
                    {flight.flightClass}
                  </div>
                  <button onClick={() => toggleExpand(flight.id)}>
                    {expandedCard === flight.id ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="font-bold flex flex-col items-center">
                    <p>
                      {new Date(flight.departureTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="uppercase">
                      {flight.departureAirport.airportCode}
                    </p>
                  </div>
                  <div className="w-96 flex flex-col items-center">
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
                    <div className="border-t-2 w-full"></div>
                    <p>{flight.information}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>
                      {new Date(flight.arrivalTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p>{flight.arrivalAirport.airportCode}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-xl font-bold text-color-primary">
                      IDR {flight.price.toLocaleString()}
                    </p>
                    <Button className="bg-color-primary rounded-lg w-full">
                      Pilih
                    </Button>
                  </div>
                </div>
                {expandedCard === flight.id && (
                  <div className="transition-all duration-500 delay-1000 ease-in-out">
                    <div className="border-t-2 py-3"></div>
                    <p className="font-bold text-lg text-color-primary">
                      Detail Penerbangan
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>
                          {new Date(flight.departureTime).toLocaleTimeString(
                            [],
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </p>
                        <p>
                          {new Date(flight.departureTime).toLocaleDateString()}
                        </p>
                        <p>
                          {flight.departureAirport.airportName} - Terminal{" "}
                          {flight.terminal}
                        </p>
                      </div>
                      <div className="mb-auto">
                        <p>Keberangkatan</p>
                      </div>
                    </div>
                    <div className="border-t-2 py-3 w-72 mx-auto"></div>
                    <div className="flex justify-start">
                      <FaLeaf className="my-auto me-4" />
                      <div>
                        <p>
                          {flight.airline.airlineName} - {flight.flightClass}
                        </p>
                        <p>{flight.flightCode}</p>
                        <p>Informasi:</p>
                        <p>{flight.information}</p>
                      </div>
                    </div>
                    <div className="border-t-2 py-3 w-72 mx-auto"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p>
                          {new Date(flight.arrivalTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p>
                          {new Date(flight.arrivalTime).toLocaleDateString()}
                        </p>
                        <p>
                          {flight.arrivalAirport.airportName} - Terminal{" "}
                          {flight.terminal}
                        </p>
                      </div>
                      <div className="mb-auto">
                        <p>Kedatangan</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <h3>No Flights Found</h3>
        )}
      </div>
    </div>
  );
};

export default SearchFlightPage;
