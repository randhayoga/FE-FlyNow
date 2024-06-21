import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { profile } from "../../redux/actions/auth";
import {
  getFlightDetail,
  getReturnFlightDetail,
} from "../../redux/actions/flight";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { CgArrowsV } from "react-icons/cg";

import {
  BreadcrumbWithTimer,
  FlightDetail,
  OrdererField,
  BookingForm,
} from "@/components/Booking";
import { Button } from "@/components/ui/button";

const BookingPage = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { flight, returnFlight } = useSelector((state) => state.flights);

  const [searchParams] = useSearchParams();

  const [passengers, setPassengers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReturnLoading, setIsReturnLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const flightId = parseInt(searchParams.get("df"));
  const returnFlightId = parseInt(searchParams.get("rf"));

  const adult = parseInt(searchParams.get("adult")) || 0;
  const children = parseInt(searchParams.get("children")) || 0;
  const baby = parseInt(searchParams.get("baby")) || 0;

  useEffect(() => {
    dispatch(profile(null, null, null));
  }, [dispatch, token]);

  useEffect(() => {
    if (flightId) {
      dispatch(getFlightDetail(setIsLoading, flightId));
    }
  }, [dispatch, flightId]);

  useEffect(() => {
    if (returnFlightId) {
      dispatch(getReturnFlightDetail(setIsReturnLoading, returnFlightId));
    }
  }, [dispatch, returnFlightId]);

  useEffect(() => {
    const params = {
      adult,
      children,
      baby,
    };

    const passengerArray = [];
    for (let i = 0; i < params.adult; i++) {
      passengerArray.push({ type: "Adult", index: i + 1 });
    }
    for (let i = 0; i < params.children; i++) {
      passengerArray.push({ type: "Children", index: i + 1 + params.adult });
    }
    for (let i = 0; i < params.baby; i++) {
      passengerArray.push({
        type: "Baby",
        index: i + 1 + params.adult + params.children,
      });
    }

    setPassengers(passengerArray);
  }, [adult, children, baby]);

  // Rincian Harga
  const calculateTotalPrice = (flight, adult, children) => {
    const priceAdult = flight?.price * adult || 0;
    const priceChildren = flight?.price * children || 0;
    const tax = 0.11 * (priceAdult + priceChildren);
    return priceAdult + priceChildren + tax;
  };

  const totalDeparturePrice = calculateTotalPrice(flight, adult, children);
  const totalReturnPrice = calculateTotalPrice(returnFlight, adult, children);
  const combinedTotalPrice = totalDeparturePrice + totalReturnPrice;

  return (
    <div className="flex flex-col mx-auto w-4/5 min-h-screen items-center">
      <BreadcrumbWithTimer isSubmitted={isSubmitted} />
      <div className="w-full flex flex-col lg:flex-row pt-48">
        <div className="lg:w-3/5 p-3">
          <OrdererField />
          <BookingForm
            passengers={passengers}
            token={token}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            setIsSubmitting={setIsSubmitting}
            setIsSubmitted={setIsSubmitted}
          />
        </div>

        <div className="lg:w-2/5 p-3">
          <h1 className="font-bold tracking-wide text-lg mb-2">
            Detail Penerbangan
          </h1>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-5 mt-4 border-2 px-4 py-2 rounded-md"
          >
            <CollapsibleTrigger>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold tracking-wide text-base text-color-primary">
                  Penerbangan Pergi
                </h1>
                <CgArrowsV className="text-lg text-gray-400" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <FlightDetail
                flight={flight}
                adult={adult}
                children={children}
                baby={baby}
                isLoading={isLoading}
              />
            </CollapsibleContent>
          </Collapsible>

          {returnFlightId ? (
            <Collapsible className="flex flex-col gap-5 mt-4 border-2 px-4 py-2 rounded-md">
              <CollapsibleTrigger>
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold tracking-wide text-base text-color-primary">
                    Penerbangan Pulang
                  </h1>
                  <CgArrowsV className="text-lg text-gray-400" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <FlightDetail
                  flight={returnFlight}
                  adult={adult}
                  children={children}
                  baby={baby}
                  isLoading={isReturnLoading}
                />
              </CollapsibleContent>
            </Collapsible>
          ) : (
            ""
          )}

          {returnFlightId ? (
            <>
              <h1 className="font-semibold text-lg mt-4">Rincian Harga</h1>
              {!isLoading ? (
                <div className="flex w-full justify-between items-center">
                  <h2>Harga Penerbangan Pergi</h2>
                  <p>IDR {totalDeparturePrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-4 mb-2" />
              )}

              {!isReturnLoading ? (
                <div className="flex w-full justify-between items-center">
                  <h2>Harga Penerbangan Pulang</h2>
                  <p>IDR {totalReturnPrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-4 mb-2" />
              )}

              <Separator className="my-2" />

              {!isLoading && !isReturnLoading ? (
                <div className="flex w-full justify-between items-center text-xl font-bold text-color-primary">
                  <h2>Total Harga</h2>
                  <p>IDR {combinedTotalPrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-6" />
              )}
            </>
          ) : (
            ""
          )}

          {isSubmitted && (
            <Button className="w-full mt-4 py-6 rounded-xl text-lg font-medium bg-red-600 hover:bg-red-700">
              Lanjut Bayar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
