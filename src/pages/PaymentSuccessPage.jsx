import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import success from "@/assets/images/gambar_history_kosong.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <>
      <div className="shadow-md py-4">
        <div className="container">
          <h1 className="text-xl font-bold mt-20 mb-5">Pilih Penerbangan</h1>
          <div className="w-full font-semibold tracking-wide mb-6 bg-white">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold cursor-default">
                    Isi Data Diri
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">
                    Bayar
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">
                    Selesai
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-full flex justify-center items-center rounded-xl py-3 font-normal text-base bg-[#43b027] text-white">
              Terima Kasih Atas Pembayaran Transaksi
            </div>
          </div>
        </div>
      </div>
      <div className=" contaienr font-semibold flex flex-col items-center justify-center text-center my-10">
        <img src={success} alt="success" className="pb-4" />
        <p className="text-color-primary ">Selamat!</p>
        <p>Transaksi Pembayaran Tiket Sukses!</p>
        <Button className="rounded-xl bg-color-primary hover:bg-hover-primary w-80 mt-7">
          <Link to="/history">Terbitkan Tiket</Link>
        </Button>
        <Button className="rounded-xl bg-color-primary hover:bg-hover-primary w-80 mt-3">
          <Link to="/">Cari Penerbangan Lain</Link>
        </Button>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
