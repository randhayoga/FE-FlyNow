import React from "react";
import BreadcrumbPaymentStatus from "./BreadcrumbPaymentStatus";

const PaymentSuccessHeader = ({ status }) => {
  return (
    <div>
      <div className="w-full flex flex-col justify-center bg-white tracking-wide">
        <BreadcrumbPaymentStatus status={status} />
      </div>
      {status == 200 ? (
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full flex justify-center items-center rounded-xl py-3 font-semibold text-base bg-alert-success text-white">
            Terima Kasih Atas Pembayaran Transaksi
          </div>
        </div>
      ) : status == 201 ? (
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full flex justify-center items-center rounded-xl py-3 font-semibold text-base bg-alert-danger text-white">
            Transaksi Pembayaran Anda Pending
          </div>
        </div>
      ) : status == 407 ? (
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full flex justify-center items-center rounded-xl py-3 font-semibold text-base bg-alert-danger text-white">
            Transaksi Pembayaran Anda Expired
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full flex justify-center items-center rounded-xl py-3 font-semibold text-base bg-alert-danger text-white">
            Invalid Status Code!!!
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessHeader;
