import React from "react";

import PaymentSuccessHeader from "@/components/Payment/PaymentSuccessHeader";
import PaymentSuccessBody from "@/components/Payment/PaymentSuccessBody";

const PaymentSuccessPage = () => {
  return (
    <>
      <div className="shadow-md py-4">
        <div className="container">
          <PaymentSuccessHeader />
        </div>
      </div>
      <div className=" contaienr font-semibold flex flex-col items-center justify-center text-center my-10">
        <PaymentSuccessBody />
      </div>
    </>
  );
};

export default PaymentSuccessPage;
