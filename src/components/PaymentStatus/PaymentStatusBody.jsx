import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import success from "@/assets/images/gambar_history_kosong.png";
import pending from "@/assets/images/pending.png";

const PaymentStatusBody = ({ status }) => {
  return (
    <>
      {status == 200 ? (
        <>
          <img src={success} alt="success" className="pb-4" />
          <p className="text-color-primary ">Selamat!</p>
          <p>Transaksi Pembayaran Tiket Sukses!</p>
          <Button className="rounded-xl bg-color-primary hover:bg-hover-primary w-80 mt-7">
            <Link to="/history">Terbitkan Tiket</Link>
          </Button>
          <Button className="rounded-xl bg-color-primary hover:bg-hover-primary w-80 mt-3">
            <Link to="/">Cari Penerbangan Lain</Link>
          </Button>
        </>
      ) : status == 201 ? (
        <>
          <img src={pending} alt="pending" className="pb-4 w-1/5" />
          <p className="text-color-primary ">Transaksi Pending!</p>
          <p>Segera Lanjutkan Transaksi Pembayaran</p>
          <Button className="rounded-xl bg-color-primary hover:bg-hover-primary w-80 mt-7">
            <Link to="/history">Lanjutkan Pembayaran</Link>
          </Button>
        </>
      ) : (
        <p>Invalid Status Code</p>
      )}
    </>
  );
};

export default PaymentStatusBody;
