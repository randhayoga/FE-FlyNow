import React, { useEffect, useState } from "react";
import { FaRegCircleCheck, FaLocationDot } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { TbPlaneDeparture, TbPlaneArrival } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { PiCityBold } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { FilterButton } from "@/components/ui/filterButton";
import { GiCommercialAirplane } from "react-icons/gi";
import { PrintTicketButton } from "@/components/ui/printTicketButton";
import { Button } from "@/components/ui/button";
import { PaymentBadge } from "@/components/ui/paymentBadge";
import moment from "moment";
import "moment/locale/id";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import gambar_history_kosong from "@/assets/images/gambar_history_kosong.png";
moment.locale("id");
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { searchHistories } from "../../redux/actions/history";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.histories);
  const [currentHistory, setCurrentHistory] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistories = async () => {
      setLoading(true);
      await dispatch(searchHistories());
      setLoading(false);
    };
    fetchHistories();
  }, [dispatch]);

  useEffect(() => {
    if (histories.length > 0) {
      setCurrentHistory(histories[0]);
    }
  }, [histories]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setModal(true);
      } else {
        setModal(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state based on window width
    if (window.innerWidth >= 1024) {
      setModal(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container overflow-x-hidden">
      <h1 className="font-semibold text-xl mt-10">Riwayat Pemesanan</h1>
      <div className="content mt-5 sm:mx-3 md:mx-3">
        <div className="head flex items-center gap-3">
          <div className="page-text bg-color-primary rounded-lg p-3 grow">
            <div className="page-text-content flex items-center gap-4">
              <a href="/">
                <GoArrowLeft className="text-white text-xl" />
              </a>
              <div className="text-white text-lg">Beranda</div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <FilterButton variant="outline" className="flex gap-2">
                <CiFilter className="text-lg" />
                <div>Filter</div>
              </FilterButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="font-semibold">
                Penerbangan
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <PiCityBold className="me-2" />
                  <span>Kota</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span>Jakarta</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Melbourne</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Shanghai</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FaRegCircleCheck className="me-2" />
                  <span>Status</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <FaRegCircleCheck className="me-2" />
                      <span>Selesai</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FaRegClock className="me-2" />
                      <span>Menunggu pembayaran</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GiCancel className="me-2" />
                      <span>Dibatalkan</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {loading === true ? (
          <div className="loading w-full flex items-center flex-col h-full mt-20 justify-center">
            <p>Loading...</p>
          </div>
        ) : histories.length === 0 ? (
          <div className="w-full flex items-center flex-col h-full mt-20 justify-center">
            <img src={gambar_history_kosong} alt="history not found" />
            <div className="mt-4 text-color-primary text-lg">
              Oops! Riwayat pesanan kosong!
            </div>
            <div className="text-color-primary text-opacity-50">
              Anda belum melakukan pemesanan penerbangan
            </div>
            <Button
              size="lg"
              variant="success"
              className="mt-4"
              onClick={() => navigate("/")}
            >
              Cari Penerbangan
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="histories col-span-2 bg-white">
              <div className="card-container flex flex-col gap-2">
                {histories.map((history, index) => {
                  const departureDate = new Date(
                    history.flight.departureTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  const departureTime = new Date(
                    history.flight.departureTime
                  ).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  const arrivalDate = new Date(
                    history.flight.arrivalTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  const arrivalTime = new Date(
                    history.flight.arrivalTime
                  ).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  const departureMoment = moment(history.flight.departureTime);
                  const arrivalMoment = moment(history.flight.arrivalTime);
                  const duration = moment.duration(
                    arrivalMoment.diff(departureMoment)
                  );
                  const durationInHours = duration.asHours();

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
                        if (window.innerWidth < 1024) {
                          setModal(true);
                        }
                      }}
                    >
                      <div className="payment-status">
                        <PaymentBadge
                          variant={
                            history.payment.status == "paid"
                              ? "success"
                              : history.payment.status == "unpaid"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {history.payment.paymentStatus[0].toUpperCase() +
                            history.payment.paymentStatus.slice(1)}
                        </PaymentBadge>
                      </div>
                      <div className="timeline py-4 flex gap-4 lg:gap-14">
                        <div className="departure flex gap-2">
                          <div className="pointer-icon text-gray-500 text-2xl">
                            <TbPlaneDeparture />
                          </div>
                          <div className="departure-text flex flex-col text-xs">
                            <div className="city mt-0 font-bold lg:text-base">
                              {history.departureAirport.city[0].toUpperCase() +
                                history.departureAirport.city.slice(1)}
                            </div>
                            <div className="date">{departureDate}</div>
                            {<div className="time">{departureTime}</div>}
                          </div>
                        </div>
                        <div className="flex-grow flex flex-col justify-center items-center">
                          <div className="duration text-xs lg:text-base text-gray-500">
                            {durationInHours}{" "}
                            {durationInHours > 1 ? "hours" : "hour"}
                          </div>
                          <div className="arrow flex w-full items-center border border-gray-400"></div>
                        </div>
                        <div className="arrival flex gap-2">
                          {" "}
                          <div className="pointer-icon text-gray-500 text-2xl">
                            <TbPlaneArrival />
                          </div>
                          <div className="arrival-text flex text-xs flex-col">
                            <div className="city mt-0 font-bold lg:text-base">
                              {history.arrivalAirport.city[0].toUpperCase() +
                                history.arrivalAirport.city.slice(1)}
                            </div>
                            <div className="date">{arrivalDate}</div>
                            {<div className="time">{arrivalTime}</div>}
                          </div>
                        </div>
                      </div>
                      <div className="details border-t-2 pt-3 text-xs lg:text-base flex items-center justify-between">
                        <div className="booking-code">
                          <p className="font-semibold">Booking code:</p>
                          <p>{history.bookingCode}</p>
                        </div>
                        <div className="filght-class">
                          <p className="font-semibold">Class:</p>
                          <p>
                            {history.flight.flightClass[0].toUpperCase() +
                              history.flight.flightClass.slice(1)}
                          </p>
                        </div>
                        <div className="price">
                          <p className="font-bold text-color-primary lg:text-lg">
                            IDR {history.payment.paymentAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {currentHistory?.id && (
              <>
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
                    <div className="font-bold text-2xl">Details</div>
                    <PaymentBadge
                      variant={
                        currentHistory.payment.paymentStatus == "paid"
                          ? "success"
                          : currentHistory.payment.paymentStatus == "unpaid"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {currentHistory.payment.paymentStatus[0].toUpperCase() +
                        currentHistory.payment.paymentStatus.slice(1)}
                    </PaymentBadge>
                  </div>
                  <div className="booking-code text-xl flex">
                    <div className="label">
                      Booking Code:{" "}
                      <span className="code font-semibold text-color-primary">
                        {currentHistory.bookingCode}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mt-4">
                      <div className="font-semibold">
                        {new Date(
                          currentHistory.flight.departureTime
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
                        currentHistory.flight.departureTime
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="">
                      {currentHistory.departureAirport.airportName} - Terminal{" "}
                      {currentHistory.flight.terminal}
                    </div>
                  </div>
                  <div className="py-2 flex items-center gap-4 border-t-2">
                    <div className="flight-logo text-2xl text-yellow-500">
                      <GiCommercialAirplane />
                    </div>
                    <div className="flex flex-col">
                      <div className="flight font-semibold pb-4">
                        <div className="">
                          {currentHistory.airline.airlineName}
                        </div>
                        <div className="">
                          {currentHistory.airline.airlineCode}
                        </div>
                      </div>
                      <div className="passengers">
                        <div className="text-semibold">Informasi:</div>
                        {currentHistory.details.map((detail, index) => {
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
                          currentHistory.flight.arrivalTime
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
                        currentHistory.flight.arrivalTime
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="">
                      {currentHistory.arrivalAirport.airportName}
                    </div>
                  </div>
                  <div className="border-t-2 py-2">
                    <div className="font-semibold">Rincian Harga</div>
                    <div className="flex justify-between w-full">
                      <div className="">
                        {currentHistory.numAdults} Adult(s)
                      </div>
                      <div className="">
                        IDR
                        {(
                          currentHistory.flight.price * currentHistory.numAdults
                        ).toLocaleString("id-ID")}
                      </div>
                    </div>
                    {currentHistory.numChildren > 0 && (
                      <div className="flex justify-between w-full">
                        <div className="">
                          {currentHistory.numChildren} Children(s)
                        </div>
                        <div className="">
                          IDR{" "}
                          {(
                            currentHistory.flight.price *
                            currentHistory.numChildren
                          ).toLocaleString("id-ID")}
                        </div>
                      </div>
                    )}
                    {currentHistory.numBabies > 0 && (
                      <div className="flex justify-between w-full">
                        <div className="">
                          {currentHistory.numBabies} Baby(s)
                        </div>
                        <div className="">
                          IDR{" "}
                          {(
                            currentHistory.flight.price *
                            currentHistory.numBabies
                          ).toLocaleString("id-ID")}
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between font-bold w-full my-3 items-center">
                      <div className="">Total</div>
                      <div className="text-color-primary text-lg">
                        IDR{" "}
                        {currentHistory.payment.paymentAmount.toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>

                    {currentHistory.payment.paymentStatus === "paid" ? (
                      <Button size="lg" variant="success" className="w-full">
                        Cetak Tiket
                      </Button>
                    ) : currentHistory.payment.paymentStatus === "unpaid" ? (
                      <Button
                        disabled
                        size="lg"
                        variant="success"
                        className="w-full"
                      >
                        Cetak Tiket
                      </Button>
                    ) : (
                      <Button size="lg" variant="success" className="w-full">
                        Lanjutkan pembayaran
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
