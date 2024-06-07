import { React, useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchFlight } from "../../redux/actions/flight";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaLeaf, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ArrowLeft, ArrowUpDown } from "lucide-react";

const SearchFlightPage = () => {
  const dispatch = useDispatch();
  const { flights } = useSelector((state) => state.flights);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
  const [isSelectingReturnFlight, setIsSelectingReturnFlight] = useState(false);

  useEffect(() => {
    const queryParams = {
      da: searchParams.get("da"),
      aa: searchParams.get("aa"),
      dd: searchParams.get("dd"),
      rd: searchParams.get("rd"),
      class: searchParams.get("class"),
      sort: searchParams.get("sort"),
    };
    dispatch(searchFlight(queryParams));
  }, [dispatch, searchParams]);

  const toggleExpand = (flightId) => {
    setExpandedCard((prev) => (prev === flightId ? null : flightId));
  };

  const handleSelectDeparture = (flight) => {
    setSelectedDepartureFlight(flight);
    setIsSelectingReturnFlight(true);
  };

  const handleSelectReturn = (flight) => {
    setSelectedReturnFlight(flight);
    // Handle any further actions after selecting return flight, e.g., saving selections
  };

  const handleSortChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", value);
    setSearchParams(newSearchParams);
    navigate(`/flight/search?${newSearchParams.toString()}`);
  };

  return (
    <div>
      <div className="shadow-md py-4">
        <div className="container">
          <h1 className="text-xl font-bold my-7">Pilih Penerbangan </h1>
          <div className="flex items-center">
            <div className="flex items-center w-full h-12 px-4 bg-ColorPrimary rounded-lg text-white">
              <Link to="/" className="mr-3">
                <ArrowLeft />
              </Link>
              {searchParams.get("da")} - {searchParams.get("aa")} - 2 Penumpang
              - {searchParams.get("class")}
            </div>
            <div className="ms-4">
              <Link to="/">
                <Button className="bg-[#43b027] w-56 h-12 rounded-lg ">
                  Ubah Pencarian
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-7">
        <div className="flex justify-end">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-auto rounded-full border-2 border-ColorPrimary text-ColorPrimary font-bold">
              <ArrowUpDown className="me-2"></ArrowUpDown>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="price-asc">Harga - Termurah</SelectItem>
                <SelectItem value="price-desc">Harga - Termahal</SelectItem>
                <SelectItem value="departure-asc">
                  Keberangkatan - Paling Awal
                </SelectItem>
                <SelectItem value="departure-desc">
                  Keberangkatan - Paling Akhir
                </SelectItem>
                <SelectItem value="arrival-asc">
                  Kedatangan - Paling Awal
                </SelectItem>
                <SelectItem value="arrival-desc">
                  Kedatangan - Paling Akhir
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {flights.departureFlights && flights.returnFlights ? (
          <div>
            {selectedDepartureFlight && (
              <div className="mb-4">
                <h2 className="text-lg font-bold">
                  Penerbangan Pergi Terpilih:
                </h2>
                <Card className="w-full shadow-md mb-4">
                  <div className="p-7">
                    <div className="flex justify-between items-center">
                      <div className="capitalize text-lg font-semibold flex items-center">
                        <FaLeaf className="mr-2" />{" "}
                        {selectedDepartureFlight.airline.airlineName} -{" "}
                        {selectedDepartureFlight.flightClass}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="font-bold flex flex-col items-center">
                        <p>
                          {new Date(
                            selectedDepartureFlight.departureTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="uppercase">
                          {selectedDepartureFlight.departureAirport.airportCode}
                        </p>
                      </div>
                      <div className="w-96 flex flex-col items-center">
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
                        <div className="border-t-2 w-full"></div>
                        <p>{selectedDepartureFlight.information}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p>
                          {new Date(
                            selectedDepartureFlight.arrivalTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p>
                          {selectedDepartureFlight.arrivalAirport.airportCode}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-xl font-bold text-ColorPrimary">
                          IDR {selectedDepartureFlight.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {isSelectingReturnFlight ? (
              <div>
                <h2 className="text-lg font-bold mb-4">
                  Pilih Penerbangan Pulang
                </h2>
                {flights.returnFlights && flights.returnFlights.length > 0 ? (
                  flights.returnFlights.map((flight) => (
                    <Card key={flight.id} className="w-full shadow-md mb-4">
                      <div className="p-7">
                        <div className="flex justify-between items-center">
                          <div className="capitalize text-lg font-semibold flex items-center">
                            <FaLeaf className="mr-2" />{" "}
                            {flight.airline.airlineName} - {flight.flightClass}
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
                              {new Date(
                                flight.departureTime
                              ).toLocaleTimeString([], {
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
                              {new Date(flight.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <p>{flight.arrivalAirport.airportCode}</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-xl font-bold text-ColorPrimary">
                              IDR {flight.price.toLocaleString()}
                            </p>
                            <Button
                              className="bg-ColorPrimary rounded-lg w-full"
                              onClick={() => handleSelectReturn(flight)}
                            >
                              Pilih
                            </Button>
                          </div>
                        </div>
                        {expandedCard === flight.id && (
                          <div className="transition-all duration-500 delay-1000 ease-in-out">
                            <div className="border-t-2 py-3"></div>
                            <p className="font-bold text-lg text-ColorPrimary">
                              Detail Penerbangan
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p>
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleDateString()}
                                </p>
                                <p>
                                  {flight.departureAirport.airportName} -
                                  Terminal {flight.terminal}
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
                                  {flight.airline.airlineName} -{" "}
                                  {flight.flightClass}
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
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleDateString()}
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
                  <h3>No Return Flights Found</h3>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold mb-4">
                  Pilih Penerbangan Pergi
                </h2>
                {flights.departureFlights &&
                flights.departureFlights.length > 0 ? (
                  flights.departureFlights.map((flight) => (
                    <Card key={flight.id} className="w-full shadow-md mb-4">
                      <div className="p-7">
                        <div className="flex justify-between items-center">
                          <div className="capitalize text-lg font-semibold flex items-center">
                            <FaLeaf className="mr-2" />{" "}
                            {flight.airline.airlineName} - {flight.flightClass}
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
                              {new Date(
                                flight.departureTime
                              ).toLocaleTimeString([], {
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
                              {new Date(flight.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <p>{flight.arrivalAirport.airportCode}</p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-xl font-bold text-ColorPrimary">
                              IDR {flight.price.toLocaleString()}
                            </p>
                            <Button
                              className="bg-ColorPrimary rounded-lg w-full"
                              onClick={() => handleSelectDeparture(flight)}
                            >
                              Pilih
                            </Button>
                          </div>
                        </div>
                        {expandedCard === flight.id && (
                          <div className="transition-all duration-500 delay-1000 ease-in-out">
                            <div className="border-t-2 py-3"></div>
                            <p className="font-bold text-lg text-ColorPrimary">
                              Detail Penerbangan
                            </p>
                            <div className="flex items-center justify-between">
                              <div>
                                <p>
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleDateString()}
                                </p>
                                <p>
                                  {flight.departureAirport.airportName} -
                                  Terminal {flight.terminal}
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
                                  {flight.airline.airlineName} -{" "}
                                  {flight.flightClass}
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
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleDateString()}
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
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-4">Pilih Penerbangan Pergi</h2>
            {flights.departureFlights && flights.departureFlights.length > 0 ? (
              flights.departureFlights.map((flight) => (
                <Card key={flight.id} className="w-full shadow-md mb-4">
                  <div className="p-7">
                    <div className="flex justify-between items-center">
                      <div className="capitalize text-lg font-semibold flex items-center">
                        <FaLeaf className="mr-2" /> {flight.airline.airlineName}{" "}
                        - {flight.flightClass}
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
                          {new Date(flight.departureTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
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
                        <p className="text-xl font-bold text-ColorPrimary">
                          IDR {flight.price.toLocaleString()}
                        </p>
                        <Button
                          className="bg-ColorPrimary rounded-lg w-full"
                          onClick={() => handleSelectDeparture(flight)}
                        >
                          Pilih
                        </Button>
                      </div>
                    </div>
                    {expandedCard === flight.id && (
                      <div className="transition-all duration-500 delay-1000 ease-in-out">
                        <div className="border-t-2 py-3"></div>
                        <p className="font-bold text-lg text-ColorPrimary">
                          Detail Penerbangan
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p>
                              {new Date(
                                flight.departureTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <p>
                              {new Date(
                                flight.departureTime
                              ).toLocaleDateString()}
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
                              {flight.airline.airlineName} -{" "}
                              {flight.flightClass}
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
                              {new Date(flight.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <p>
                              {new Date(
                                flight.arrivalTime
                              ).toLocaleDateString()}
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
        )}
      </div>
    </div>
  );
};

export default SearchFlightPage;
