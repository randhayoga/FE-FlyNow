import { React, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { getPaymentByBookingId } from "../../redux/actions/booking";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import useSnap from "@/hook/useSnap";

const PaymentPage = () => {
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
    <div className="container mt-32">
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
              <BreadcrumbPage className="font-semibold">Bayar</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                Selesai
                {/* <Link to="/flight/payment/success">Selesai</Link> */}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full flex justify-center items-center rounded-xl py-3 font-normal text-base bg-red-600 text-white">
          Selesaikan dalam 00:
        </div>
      </div>

      <div className="flex mb-44">
        <div
          id="snap-container"
          className="w-full me-10 rounded-md border border-gray-300 border-2 border-round"
        ></div>
        <div className="lg:w-2/5">
          <h1>Booking Code : {booking?.booking?.bookingCode}</h1>
          <section>
            <div className="flex w-full justify-between items-center font-semibold tracking-wide">
              <p className="text-lg">07:00</p>
              <p className="text-sm text-color-primary">Keberangkatan</p>
            </div>
            <p className="font-normal">07:00</p>
            <p className="font-medium">123</p>
          </section>
          <Separator className="my-4" />
          <section className="flex w-full gap-2">
            <div className="flex w-6 justify-center items-center">
              <img src="" alt="flight" className="w-6" />
            </div>
            <div className="flex-grow font-semibold tracking-wide">
              <p>Lion Air - Economy</p>
              <p className="mb-4">SD-123</p>
              <p>Informasi:</p>

              <p className="font-normal text-sm">dasdasd</p>
            </div>
          </section>
          <Separator className="my-4" />
          <section>
            <div className="flex w-full justify-between items-center font-semibold tracking-wide">
              <p className="text-lg">dasdasdasd</p>
              <p className="text-sm text-color-primary">Kedatangan</p>
            </div>
            <p className="font-normal">asdasdasd</p>
            <p className="font-medium">dasdasd</p>
          </section>
          <Separator className="my-4" />
          <section>
            <p className="font-semibold tracking-wide">Rincian Harga</p>
            <div className="flex w-full justify-between items-center">
              <p> Adult</p>
              <p>IDR 123</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p> Children</p>
              <p>IDR dasdasd</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p> Babies</p>
              <p>IDR 0</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p>Tax (11%)</p>
              <p>IDR dasdasd</p>
            </div>
            <Separator className="my-4" />
            <section className="font-semibold tracking-wide">
              <div className="flex w-full justify-between items-center">
                <p>Total</p>
                <p className="text-xl text-color-primary">IDR sdasdas</p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
