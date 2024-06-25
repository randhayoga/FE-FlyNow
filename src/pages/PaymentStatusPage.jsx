import React from "react";
import { useSearchParams } from "react-router-dom";

import PaymentStatusHeader from "@/components/PaymentStatus/PaymentStatusHeader";
import PaymentStatusBody from "@/components/PaymentStatus/PaymentStatusBody";

const PaymentStatusPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status_code");
  return (
    <>
      <div className="shadow-md py-4">
        <div className="container">
          <PaymentStatusHeader status={status} />
        </div>
      </div>
      <div className=" contaienr font-semibold flex flex-col items-center justify-center text-center my-10">
        <PaymentStatusBody status={status} />
      </div>
    </>
  );
};

export default PaymentStatusPage;
