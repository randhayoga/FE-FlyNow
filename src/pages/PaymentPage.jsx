import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentByBookingId } from "../../redux/actions/payment";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import CollapsibleBooking from "@/components/Payment/CollapsibleBooking";
import BookingDetailHeader from "@/components/Payment/BookingDetailHeader";

import useSnap from "@/hook/useSnap";

const PaymentPage = () => {
  const [isOpenPergi, setIsOpenPergi] = useState(true);
  const [isOpenPulang, setIsOpenPulang] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.payment);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPaymentByBookingId(id, setIsLoading));
  }, [dispatch, id]);

  const { snapEmbed } = useSnap();

  useEffect(() => {
    if (payment?.snapToken) {
      snapEmbed(payment?.snapToken, "snap-container");
    }
  }, [payment, snapEmbed]);

  const numAdults = payment?.booking?.numAdults;
  const numChildren = payment?.booking?.numChildren;

  const calculateTotalPrice = (flightPrice, numAdults, numChildren) => {
    const priceAdult = flightPrice * numAdults || 0;
    const priceChildren = flightPrice * numChildren || 0;
    return priceAdult + priceChildren;
  };

  const totalDeparturePrice = calculateTotalPrice(
    payment?.booking?.departureFlight?.price,
    numAdults,
    numChildren
  );

  const totalReturnPrice = calculateTotalPrice(
    payment?.booking?.returnFlight?.price,
    numAdults,
    numChildren
  );

  return (
    <>
      <div className="shadow-md py-4">
        <div className="container">
          <BookingDetailHeader createdAt={payment?.createdAt} />
        </div>
      </div>
      <div className="container mx-auto my-10 flex flex-col lg:flex-row">
        <div
          id="snap-container"
          className="w-full lg:me-10 rounded-md border-2 border-gray-300 border-round order-1 mb-6 lg:mb-0 h-full"
        ></div>
        <div className=" lg:w-1/2 order-2 ">
          {!isLoading ? (
            <p className="text-lg font-bold">
              Kode Pemesanan:{" "}
              <span className="text-color-primary">
                {payment?.booking?.bookingCode}
              </span>
            </p>
          ) : (
            <Skeleton className=" w-4/5 h-6" />
          )}
          <CollapsibleBooking
            booking={payment?.booking}
            flight={payment?.booking?.departureFlight}
            isOpen={isOpenPergi}
            isLoading={isLoading}
            setIsOpen={setIsOpenPergi}
            title="Penerbangan Pergi"
          />
          {payment?.booking?.returnFlight && (
            <CollapsibleBooking
              booking={payment?.booking}
              flight={payment?.booking?.returnFlight}
              isOpen={isOpenPulang}
              isLoading={isLoading}
              setIsOpen={setIsOpenPulang}
              title="Penerbangan Pulang"
            />
          )}

          {payment?.booking?.returnFlight && (
            <>
              <h1 className="font-bold  text-lg mt-4">Rincian Harga</h1>
              {!isLoading ? (
                <div className="flex w-full justify-between items-center">
                  <h2>Total Penerbangan Pergi</h2>
                  <p>IDR {totalDeparturePrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-4 mb-2" />
              )}
              {!isLoading ? (
                <div className="flex w-full justify-between items-center">
                  <h2>Total Penerbangan Pulang</h2>
                  <p>IDR {totalReturnPrice.toLocaleString("id-ID")}</p>
                </div>
              ) : (
                <Skeleton className="w-full h-4 mb-2" />
              )}
              <Separator className="my-2" />
              {!isLoading ? (
                <div className="flex w-full justify-between items-center text-xl font-bold ">
                  <h2>Total</h2>
                  <p className="text-color-primary">
                    IDR {payment?.paymentAmount.toLocaleString("id-ID")}
                  </p>
                </div>
              ) : (
                <Skeleton className="w-full h-6" />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
