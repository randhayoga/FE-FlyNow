import React from "react";
import BreadcrumbPaymentSuccess from "@/components/Payment/BreadcrumbPaymentSuccess";

const PaymentSuccessHeader = () => {
  return (
    <div>
      <div className="w-full font-semibold tracking-wide my-5 bg-white">
        <BreadcrumbPaymentSuccess />
      </div>
      <div className="flex flex-col sm:flex-row items-center">
        <div className="w-full flex justify-center items-center rounded-xl py-3 font-normal text-base bg-alert-success text-white">
          Terima Kasih Atas Pembayaran Transaksi
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessHeader;
