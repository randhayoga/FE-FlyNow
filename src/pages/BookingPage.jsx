import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";

import { profile } from "../../redux/actions/auth";
import { createPayment } from "../../redux/actions/booking";
import {
  getFlightDetail,
  getReturnFlightDetail,
} from "../../redux/actions/flight";
import { getIsUnread } from "../../redux/actions/notification";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { CgArrowsV } from "react-icons/cg";

import {
  BookingForm,
  BookingPageHeader,
  FlightDetail,
  OrdererField,
} from "@/components/Booking";

export const loader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  if (!user?.phoneNumber || !user?.isVerified) {
    const message =
      !user.phoneNumber && !user.isVerified
        ? "Anda harus verifikasi otp dan menambahkan nomor telepon terlebih dahulu!"
        : !user.phoneNumber
        ? "Anda harus menambahkan nomor telepon terlebih dahulu!"
        : !user.isVerified
        ? "Anda harus verifikasi otp terlebih dahulu!"
        : null;

    return redirect(`/profile?message=${message}`);
  }
  return null;
};

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { flight, returnFlight } = useSelector((state) => state.flights);
  const { bookings } = useSelector((state) => state.bookings);

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

  // Get Departure Flight
  useEffect(() => {
    if (flightId) {
      dispatch(getFlightDetail(setIsLoading, flightId));
    }
  }, [dispatch, flightId]);

  // Get Return Flight
  useEffect(() => {
    if (returnFlightId) {
      dispatch(getReturnFlightDetail(setIsReturnLoading, returnFlightId));
    }
  }, [dispatch, returnFlightId]);

  // Generate Passengers Field
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

  // Automatically scroll to top after submmitted the form
  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitted]);

  // Total Price For Roundtrip
  const calculateTotalPrice = (flight, adult, children) => {
    const priceAdult = flight?.price * adult || 0;
    const priceChildren = flight?.price * children || 0;
    return priceAdult + priceChildren;
  };

  const totalDeparturePrice = calculateTotalPrice(flight, adult, children);
  const totalReturnPrice = calculateTotalPrice(returnFlight, adult, children);
  const combinedTotalPrice = totalDeparturePrice + totalReturnPrice;

  const handlePayment = async () => {
    try {
      await dispatch(
        createPayment(bookings.booking.id, parseInt(combinedTotalPrice))
      );
      await dispatch(getIsUnread());
      navigate(`/flight/payment/${bookings.booking.id}`);
    } catch (error) {
      console.error("Payment creation failed:", error);
    }
  };

  return (
    <>
      <div className="shadow-md py-4">
        <div className="container">
          <BookingPageHeader isSubmitted={isSubmitted} />
        </div>
      </div>
      <div className="container w-full flex flex-col mt-4 lg:flex-row">
        <div className="lg:w-2/3 p-3">
          <OrdererField />
          <BookingForm
            passengers={passengers}
            token={token}
            flightId={flightId}
            returnFlightId={returnFlightId}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
            setIsSubmitting={setIsSubmitting}
            setIsSubmitted={setIsSubmitted}
          />
        </div>

        <div className="lg:w-1/3 p-3">
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
                  <h2>Total Penerbangan Pergi</h2>
                  <p>IDR {totalDeparturePrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-4 mb-2" />
              )}

              {!isReturnLoading ? (
                <div className="flex w-full justify-between items-center">
                  <h2>Total Penerbangan Pulang</h2>
                  <p>IDR {totalReturnPrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-4 mb-2" />
              )}

              <Separator className="my-2" />

              {!isLoading && !isReturnLoading ? (
                <div className="flex w-full justify-between items-center text-xl font-bold">
                  <h2>Total</h2>
                  <p className="text-color-primary">
                    IDR {combinedTotalPrice.toLocaleString("id-ID")}
                  </p>
                </div>
              ) : (
                <Skeleton className="w-full h-6" />
              )}
            </>
          ) : (
            ""
          )}

          {isSubmitted && (
            <Button
              onClick={handlePayment}
              className="w-full mt-4 py-6 rounded-xl text-lg font-medium bg-alert-danger hover:bg-red-700"
            >
              Lanjut Bayar
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
