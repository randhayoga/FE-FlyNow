import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentByBookingId } from "../../redux/actions/booking";

import BookingDetail from "@/components/Payment/BookingDetail";
import BreadcrumbPayment from "@/components/Payment/BreadcrumbPayment";

import useSnap from "@/hook/useSnap";

const PaymentPage = () => {
  const [isOpenPergi, setIsOpenPergi] = useState(true);
  const [isOpenPulang, setIsOpenPulang] = useState(false);

  const dispatch = useDispatch();
  const { booking } = useSelector((state) => state.booking);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPaymentByBookingId(id));
  }, [dispatch, id]);

  const { snapEmbed } = useSnap();

  useEffect(() => {
    if (booking?.snapToken) {
      snapEmbed(booking?.snapToken, "snap-container");
    }
  }, [booking, snapEmbed]);

  return (
    <>
      <div className="shadow-md py-4">
        <div className="container">
          <h1 className="text-xl font-bold mt-20 mb-5">Pilih Penerbangan</h1>
          <div className="w-full font-semibold tracking-wide mb-6 bg-white">
            <BreadcrumbPayment />
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-full flex justify-center items-center rounded-xl py-3 font-normal text-base bg-[#ba1a1a] text-white">
              Selesaikan Pembayaran Sebelum 10 Maret 2024 10:00
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-10 flex flex-col lg:flex-row">
        <div
          id="snap-container"
          className="w-full lg:me-10 rounded-md border-2 border-gray-300 border-round order-1 mb-6 lg:mb-0"
        ></div>
        <div className=" lg:w-1/2 order-2 ">
          <p>Kode Pemesanan : {booking?.booking?.bookingCode}</p>
          <BookingDetail
            booking={booking?.booking}
            flight={booking?.booking?.departureFlight}
            isOpen={isOpenPergi}
            setIsOpen={setIsOpenPergi}
            title="Penerbangan Pergi"
          />
          {booking?.booking?.returnFlight && (
            <BookingDetail
              booking={booking?.booking}
              flight={booking?.booking?.returnFlight}
              isOpen={isOpenPulang}
              setIsOpen={setIsOpenPulang}
              title="Penerbangan Pulang"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
