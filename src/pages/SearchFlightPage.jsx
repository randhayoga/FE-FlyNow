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

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ArrowLeft, ArrowUpDown } from "lucide-react";

import notFound from "@/assets/searchFlight/notFound.png";

const SearchFlightPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { flights } = useSelector((state) => state.flights);

  const [expandedCard, setExpandedCard] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
  const [selectedDepartureFlightOneWay, setSelectedDepartureFlightOneWay] =
    useState(null);
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

  const adult = parseInt(searchParams.get("adult"), 10) || 0;
  const children = parseInt(searchParams.get("children"), 10) || 0;
  const baby = parseInt(searchParams.get("baby"), 10) || 0;
  const totalPassengers = adult + children + baby;

  const handleSelectDepartureOneWay = (flight) => {
    setSelectedDepartureFlightOneWay(flight);
    navigate(
      `/flight/booking?df=${flight.id}&adult=${adult}&children=${children}&baby=${baby}`
    );
  };

  const handleSelectDeparture = (flight) => {
    setSelectedDepartureFlight(flight);
    setIsSelectingReturnFlight(true);
  };

  const handleSelectReturn = (flight) => {
    setSelectedReturnFlight(flight);
    navigate(
      `/flight/booking?df=${selectedDepartureFlight.id}&rf=${flight.id}&adult=${adult}&children=${children}&baby=${baby}`
    );
  };

  const handleSortChange = (value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", value);
    setSearchParams(newSearchParams);
    navigate(`/flight/search?${newSearchParams.toString()}`);
  };

  // const queryParams = new URLSearchParams({
  //   da: searchParams.get("da") || "JFK",
  //   aa: searchParams.get("aa") || "LAX",
  //   dd: searchParams.get("dd") || "2024-06-01",
  //   class: searchParams.get("class") || "economy",
  //   adult: searchParams.get("adult") || "1",
  //   children: searchParams.get("children") || "0",
  //   baby: searchParams.get("baby") || "1",
  // });

  // if (searchParams.get("rd")) {
  //   queryParams.set("rd", searchParams.get("rd"));
  // }

  return (
    <div>
      <div className="shadow-md py-4">
        <div className="container">
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
        </div>
      </div>

      <div className="container ">
        <div className="flex justify-end mt-6 mb-2">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="px-4 w-auto rounded-full border-2 border-color-primary text-color-primary font-bold">
              <ArrowUpDown className="me-2"></ArrowUpDown>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="price-asc">Harga - Termurah</SelectItem>
                <SelectItem value="price-desc">Harga - Termahal</SelectItem>
                <SelectItem value="duration-asc">Durasi - Terpendek</SelectItem>
                <SelectItem value="duration-desc">
                  Durasi - Terpanjang
                </SelectItem>
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
                <h2 className="text-lg font-bold mb-3">Penerbangan Pergi</h2>
                <Card
                  key={selectedDepartureFlight.id}
                  className="w-full shadow-md mb-5"
                >
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
                          {new Date(
                            selectedDepartureFlight.arrivalTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </p>
                        <p className="uppercase font-semibold">
                          {selectedDepartureFlight.arrivalAirport.airportCode}
                        </p>
                      </div>
                      <div className="flex flex-col items-center ps-3">
                        <p className="md:text-lg font-bold text-color-primary pb-2">
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
                              {
                                selectedDepartureFlight.departureAirport
                                  .airportName
                              }{" "}
                              - Terminal {selectedDepartureFlight.terminal}
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
                            <p className="uppercase font-bold">
                              {selectedDepartureFlight.flightCode}
                            </p>
                            <p className="font-bold">Informasi :</p>
                            <p>{selectedDepartureFlight.information}</p>
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
                            <p>
                              {
                                selectedDepartureFlight.arrivalAirport
                                  .airportName
                              }{" "}
                              - Terminal {selectedDepartureFlight.terminal}
                            </p>
                          </div>

                          <div className="mb-auto text-color-primary font-bold">
                            <p>Kedatangan</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {isSelectingReturnFlight ? (
              <div>
                <h2 className="text-lg font-bold mb-3">Penerbangan Pulang</h2>
                {flights.returnFlights && flights.returnFlights.length > 0 ? (
                  flights.returnFlights.map((flight) => (
                    <Card key={flight.id} className="w-full shadow-md mb-5">
                      <div className="p-8">
                        <div className="flex justify-between items-center pb-3">
                          <div className="capitalize md:text-lg font-semibold flex items-center">
                            <img
                              src={flight.airline.image}
                              alt="airlines logo"
                              className="w-6 me-2"
                            />{" "}
                            {flight.airline.airlineName} - {flight.flightClass}
                          </div>
                          <button
                            className=" border-2 rounded-full p-1"
                            onClick={() => toggleExpand(flight.id)}
                          >
                            {expandedCard === flight.id ? (
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
                                flight.departureTime
                              ).toLocaleTimeString([], {
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
                              {new Date(flight.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                            <p className="uppercase font-semibold">
                              {flight.arrivalAirport.airportCode}
                            </p>
                          </div>
                          <div className="flex flex-col items-center ps-3">
                            <p className="md:text-lg font-bold text-color-primary pb-2">
                              IDR{" "}
                              {new Intl.NumberFormat("id-ID").format(
                                flight.price
                              )}
                            </p>
                            <Button
                              className="bg-color-primary hover:bg-hover-primary rounded-lg ms-auto md:text-lg w-24"
                              onClick={() => handleSelectReturn(flight)}
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
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                                <p>
                                  {flight.departureAirport.airportName} -
                                  Terminal {flight.terminal}
                                </p>
                              </div>
                              <div className="mb-auto text-color-primary font-bold">
                                <p>Keberangkatan</p>
                              </div>
                            </div>
                            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
                            <div className="flex justify-start">
                              <img
                                src={flight.airline.image}
                                alt="airlines logo"
                                className="w-6 me-3 my-auto"
                              />{" "}
                              <div>
                                <p className="capitalize font-bold">
                                  {flight.airline.airlineName} -{" "}
                                  {flight.flightClass}
                                </p>
                                <p className="uppercase font-bold">
                                  {flight.flightCode}
                                </p>
                                <p className="font-bold">Informasi :</p>
                                <p>{flight.information}</p>
                              </div>
                            </div>
                            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-md">
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                                <p>
                                  {flight.arrivalAirport.airportName} - Terminal{" "}
                                  {flight.terminal}
                                </p>
                              </div>

                              <div className="mb-auto text-color-primary font-bold">
                                <p>Kedatangan</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="font-semibold flex flex-col items-center justify-center text-center">
                    <img
                      src={notFound}
                      alt="not found"
                      className=" w-72 py-4"
                    />
                    <p>Maaf, pencarian Anda tidak ditemukan</p>
                    <Link to="/" className="text-color-primary">
                      Coba cari perjalanan lainnya!
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold mb-3">Penerbangan Pergi</h2>
                {flights.departureFlights &&
                flights.departureFlights.length > 0 ? (
                  flights.departureFlights.map((flight) => (
                    <Card key={flight.id} className="w-full shadow-md mb-5">
                      <div className="p-8">
                        <div className="flex justify-between items-center pb-3">
                          <div className="capitalize md:text-lg font-semibold flex items-center">
                            <img
                              src={flight.airline.image}
                              alt="airlines logo"
                              className="w-6 me-2"
                            />{" "}
                            {flight.airline.airlineName} - {flight.flightClass}
                          </div>
                          <button
                            className=" border-2 rounded-full p-1"
                            onClick={() => toggleExpand(flight.id)}
                          >
                            {expandedCard === flight.id ? (
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
                                flight.departureTime
                              ).toLocaleTimeString([], {
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
                              {new Date(flight.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                            <p className="uppercase font-semibold">
                              {flight.arrivalAirport.airportCode}
                            </p>
                          </div>
                          <div className="flex flex-col items-center ps-3">
                            <p className="md:text-lg font-bold text-color-primary pb-2">
                              IDR{" "}
                              {new Intl.NumberFormat("id-ID").format(
                                flight.price
                              )}
                            </p>
                            <Button
                              className="bg-color-primary hover:bg-hover-primary rounded-lg ms-auto md:text-lg w-24"
                              onClick={() => handleSelectDeparture(flight)}
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
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.departureTime
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                                <p>
                                  {flight.departureAirport.airportName} -
                                  Terminal {flight.terminal}
                                </p>
                              </div>
                              <div className="mb-auto text-color-primary font-bold">
                                <p>Keberangkatan</p>
                              </div>
                            </div>
                            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
                            <div className="flex justify-start">
                              <img
                                src={flight.airline.image}
                                alt="airlines logo"
                                className="w-6 me-3 my-auto"
                              />{" "}
                              <div>
                                <p className="capitalize font-bold">
                                  {flight.airline.airlineName} -{" "}
                                  {flight.flightClass}
                                </p>
                                <p className="uppercase font-bold">
                                  {flight.flightCode}
                                </p>
                                <p className="font-bold">Informasi :</p>
                                <p>{flight.information}</p>
                              </div>
                            </div>
                            <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-md">
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </p>
                                <p>
                                  {new Date(
                                    flight.arrivalTime
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </p>
                                <p>
                                  {flight.arrivalAirport.airportName} - Terminal{" "}
                                  {flight.terminal}
                                </p>
                              </div>

                              <div className="mb-auto text-color-primary font-bold">
                                <p>Kedatangan</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="font-semibold flex flex-col items-center justify-center text-center">
                    <img
                      src={notFound}
                      alt="not found"
                      className=" w-72 py-4"
                    />
                    <p>Maaf, pencarian Anda tidak ditemukan</p>
                    <Link to="/" className="text-color-primary">
                      Coba cari perjalanan lainnya!
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-3">Penerbangan Pergi</h2>
            {flights.departureFlights && flights.departureFlights.length > 0 ? (
              flights.departureFlights.map((flight) => (
                <Card key={flight.id} className="w-full shadow-md mb-5">
                  <div className="p-8">
                    <div className="flex justify-between items-center pb-3">
                      <div className="capitalize md:text-lg font-semibold flex items-center">
                        <img
                          src={flight.airline.image}
                          alt="airlines logo"
                          className="w-6 me-2"
                        />{" "}
                        {flight.airline.airlineName} - {flight.flightClass}
                      </div>
                      <button
                        className=" border-2 rounded-full p-1"
                        onClick={() => toggleExpand(flight.id)}
                      >
                        {expandedCard === flight.id ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-md flex flex-col items-center">
                        <p className="font-bold">
                          {new Date(flight.departureTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }
                          )}
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
                      <div className="flex flex-col items-center ps-3">
                        <p className="md:text-lg font-bold text-color-primary pb-2">
                          IDR{" "}
                          {new Intl.NumberFormat("id-ID").format(flight.price)}
                        </p>
                        <Button
                          className="bg-color-primary hover:bg-hover-primary rounded-lg ms-auto md:text-lg w-24"
                          onClick={() => handleSelectDepartureOneWay(flight)}
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
                              {new Date(
                                flight.departureTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </p>
                            <p>
                              {new Date(
                                flight.departureTime
                              ).toLocaleDateString("id-ID", {
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
                            src={flight.airline.image}
                            alt="airlines logo"
                            className="w-6 me-3 my-auto"
                          />{" "}
                          <div>
                            <p className="capitalize font-bold">
                              {flight.airline.airlineName} -{" "}
                              {flight.flightClass}
                            </p>
                            <p className="uppercase font-bold">
                              {flight.flightCode}
                            </p>
                            <p className="font-bold">Informasi :</p>
                            <p>{flight.information}</p>
                          </div>
                        </div>
                        <div className="border-t-2 my-5 w-3/4 mx-auto border-gray-300"></div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-md">
                              {new Date(flight.arrivalTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                            <p>
                              {new Date(flight.arrivalTime).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </p>
                            <p>
                              {flight.arrivalAirport.airportName} - Terminal{" "}
                              {flight.terminal}
                            </p>
                          </div>

                          <div className="mb-auto text-color-primary font-bold">
                            <p>Kedatangan</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="font-semibold flex flex-col items-center justify-center text-center">
                <img src={notFound} alt="not found" className=" w-72 py-4" />
                <p>Maaf, pencarian Anda tidak ditemukan</p>
                <Link to="/" className="text-color-primary">
                  Coba cari perjalanan lainnya!
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFlightPage;
