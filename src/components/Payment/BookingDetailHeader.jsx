import React, { useState, useEffect } from "react";
import BreadcrumbPayment from "@/components/Payment/BreadcrumbPayment";
import moment from "moment";

const BookingDetailHeader = ({ createdAt }) => {
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const createdAtDate = moment(createdAt);
    const deadline = createdAtDate.add(2, "hours");

    const now = moment();
    if (now.isAfter(deadline)) {
      setPaymentMessage("Waktu Pembayaran Habis");
    } else {
      setPaymentMessage(
        `Selesaikan Pembayaran Sebelum ${deadline.format("DD MMMM YYYY HH:mm")}`
      );
    }
  }, [createdAt]);

  return (
    <>
      <div className="w-full font-semibold tracking-wide mb-6 bg-white">
        <BreadcrumbPayment />
      </div>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="w-full flex justify-center items-center rounded-xl py-3 font-normal text-base bg-alert-danger text-white">
          {paymentMessage}
        </div>
      </div>
    </>
  );
};

export default BookingDetailHeader;
