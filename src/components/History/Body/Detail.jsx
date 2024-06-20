import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CgArrowsV } from "react-icons/cg";
import { GoArrowLeft } from "react-icons/go";
import { GiCommercialAirplane } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { PaymentBadge } from "@/components/ui/paymentBadge";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-template";

function Detail({ currentHistory, modal, setModal }) {
  const adultsTotalPrice =
    (currentHistory.flight.departure?.price +
      (currentHistory.flight.arrival?.price || 0)) *
    currentHistory.numAdults;
  const childrenTotalPrice =
    (currentHistory.flight.departure?.price +
      (currentHistory.flight.arrival?.price || 0)) *
    currentHistory.numChildren;

  const printTicket = async (booking) => {
    var props = {
      outputType: OutputType.Save,
      returnJsPDFDocObject: true,
      fileName: `booking_${booking.bookingCode}`,
      orientationLandscape: false,
      compress: true,
      logo: {
        src: "https://res.cloudinary.com/ddfjulghf/image/upload/v1718854561/tspu5gqjtmu4xuymfxdc.png",
        type: "PNG",
        width: 33.33,
        height: 30.33,
        margin: {
          top: 0,
          left: 0,
        },
      },
      stamp: {
        inAllPages: true,
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: "JPG",
        width: 20,
        height: 20,
        margin: {
          top: 0,
          left: 0,
          bottom: 5,
        },
      },
      contact: {
        label: "Invoice issued for:",
        name: `${booking.user.name}`,
        phone: `Phone: ${booking.user.phoneNumber}`,
        email: `Email: ${booking.user.email}`,
      },
      invoice: {
        label: "Booking Code: ",
        num: `${booking.bookingCode}`,
        invGenDate: `Booking Date: ${new Date(
          booking.createdAt
        ).toLocaleDateString("id-ID")}`,
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#",
            style: {
              width: 10,
            },
          },
          {
            title: "Passenger Name",
            style: {
              width: 30,
            },
          },
          {
            title: "Nationality",
            style: {
              width: 30,
            },
          },
          {
            title: "Document Number",
            style: {
              width: 40,
            },
          },
          {
            title: "Type",
          },
          { title: "Price" },
        ],
        table: Array.from(booking.details.departure, (item, index) => [
          index + 1,
          item.passenger.name,
          item.passenger.nationality,
          item.passenger.docNumber,
          item.passenger.passengerType,
          item.passenger.passengerType == "baby"
            ? 0
            : booking.flight.departure.price.toLocaleString("id-ID"),
        ]),
        additionalRows: [
          {
            col1: "Subtotal:",
            col2: `${(
              booking.flight.departure.price *
              (booking.numAdults + booking.numChildren)
            ).toLocaleString("id-ID")}`,

            style: {
              fontSize: 10,
            },
          },
          {
            col1: "Tax:",
            col2: `${(
              0.11 *
              (booking.flight.departure.price *
                (booking.numAdults + booking.numChildren))
            ).toLocaleString("id-ID")}`,
            col3: "11%",
            style: {
              fontSize: 10, //optional, default 12
            },
          },

          {
            col1: "Total:",
            col2: `${booking.payment.paymentAmount.toLocaleString("id-ID")}`,

            style: {
              fontSize: 14, //optional, default 12
            },
          },
        ],
        invDescLabel: "Invoice Note",
        invDesc: `
1. Check-in Information: Please arrive at the airport at least 2 hours before your flight for check-in and security procedures.
2. Baggage Allowance: Ensure you are aware of the baggage allowance for your flight. Additional charges may apply for excess baggage.
3. Flight Changes: For any changes or cancellations to your booking, please refer to our terms and conditions or contact customer support.
        `,
      },
      footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
      },
      pageEnable: true,
      pageLabel: "Page ",
    };

    const pdfObject = jsPDFInvoiceTemplate(props);
  };

  return (
    <div
      className={`${
        modal === true ? `fixed z-50` : `hidden -z-50`
      } currentHistory top-0 duration-300 transition-all ease-in overflow-auto h-screen lg:h-auto left-0 lg:static lg:w-auto w-screen lg:col-span-1 p-6 bg-white shadow-xl lg:shadow-none lg:z-auto`}
    >
      <GoArrowLeft
        className="lg:hidden static mb-6 cursor-pointer text-3xl"
        onClick={() => {
          setModal(false);
        }}
      />
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Detail</div>
        <PaymentBadge
          variant={
            currentHistory.payment?.paymentStatus == "paid"
              ? "success"
              : currentHistory.payment?.paymentStatus == "unpaid"
              ? "destructive"
              : "secondary"
          }
        >
          {currentHistory.payment?.paymentStatus[0].toUpperCase() +
            currentHistory.payment?.paymentStatus.slice(1)}
        </PaymentBadge>
      </div>
      <div className="booking-code text-base flex">
        <div className="label">
          Kode pemesanan:{" "}
          <span className="code font-semibold text-color-primary">
            {currentHistory.bookingCode}
          </span>
        </div>
      </div>
      <Collapsible className="mt-4 border-2 px-4 py-2 rounded-md">
        <CollapsibleTrigger className=" w-full">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-base text-color-primary">
              Penerbangan {currentHistory.returnFlightId !== null ? "Awal" : ""}
            </div>
            <CgArrowsV className="text-lg text-gray-400" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="first-flight">
            <div className="mb-4">
              <div className="flex items-center justify-between mt-4">
                <div className="font-semibold">
                  {new Date(
                    currentHistory.flight.departure.departureTime
                  ).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs font-semibold text-color-primary">
                  Keberangkatan
                </div>
              </div>
              <div className="departure-time">
                {new Date(
                  currentHistory.flight.departure.departureTime
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="">
                {currentHistory.flight.departure?.departureAirport?.airportName}{" "}
                - Terminal {currentHistory.flight.departure.terminal}
              </div>
            </div>
            <div className="py-2 flex items-center gap-4 border-t-2">
              <div className="flight-logo text-2xl text-yellow-500">
                <GiCommercialAirplane />
              </div>
              <div className="flex flex-col">
                <div className="flight font-semibold pb-4">
                  <div className="">
                    {currentHistory.flight.departure.airline.airlineName}
                  </div>
                  <div className="">
                    {currentHistory.flight.departure.airline.airlineCode}
                  </div>
                </div>
                <div className="passengers">
                  <div className="text-semibold">Informasi:</div>
                  {currentHistory.details.departure.map((detail, index) => {
                    return (
                      <div key={index}>
                        <div className="text-color-primary">
                          Penumpang {index + 1}: {detail.passenger.name}
                        </div>
                        <div className="">ID: {detail.passenger.id}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="border-t-2 py-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">
                  {new Date(
                    currentHistory.flight.departure.arrivalTime
                  ).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-xs font-semibold text-color-primary">
                  Kedatangan
                </div>
              </div>
              <div className="arrival-time">
                {new Date(
                  currentHistory.flight.departure.arrivalTime
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="">
                {currentHistory.flight.departure.arrivalAirport.airportName}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      {currentHistory.returnFlightId !== null && (
        <Collapsible className="mt-4 border-2 px-4 py-2 rounded-md">
          <CollapsibleTrigger className=" w-full">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-base text-color-primary">
                Penerbangan Pulang
              </div>
              <CgArrowsV className="text-lg text-gray-400" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="first-flight">
              <div className="mb-4">
                <div className="flex items-center justify-between mt-4">
                  <div className="font-semibold">
                    {new Date(
                      currentHistory.flight.return.departureTime
                    ).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-xs font-semibold text-color-primary">
                    Keberangkatan
                  </div>
                </div>
                <div className="departure-time">
                  {new Date(
                    currentHistory.flight.return.departureTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="">
                  {currentHistory.flight.return?.departureAirport?.airportName}{" "}
                  - Terminal {currentHistory.flight.return.terminal}
                </div>
              </div>
              <div className="py-2 flex items-center gap-4 border-t-2">
                <div className="flight-logo text-2xl text-yellow-500">
                  <GiCommercialAirplane />
                </div>
                <div className="flex flex-col">
                  <div className="flight font-semibold pb-4">
                    <div className="">
                      {currentHistory.flight.return.airline.airlineName}
                    </div>
                    <div className="">
                      {currentHistory.flight.return.airline.airlineCode}
                    </div>
                  </div>
                  <div className="passengers">
                    <div className="text-semibold">Informasi:</div>
                    {currentHistory.details.return.map((detail, index) => {
                      return (
                        <div key={index}>
                          <div className="text-color-primary">
                            Penumpang {index + 1}: {detail.passenger.name}
                          </div>
                          <div className="">ID: {detail.passenger.id}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="border-t-2 py-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">
                    {new Date(
                      currentHistory.flight.return.arrivalTime
                    ).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-xs font-semibold text-color-primary">
                    Kedatangan
                  </div>
                </div>
                <div className="arrival-time">
                  {new Date(
                    currentHistory.flight.return.arrivalTime
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="">
                  {currentHistory.flight.return.arrivalAirport.airportName}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      <div className="py-2">
        <div className="font-semibold">Rincian Harga</div>
        <div className="flex justify-between w-full">
          <div className="">{currentHistory.numAdults} Dewasa</div>
          <div className="">IDR {adultsTotalPrice.toLocaleString("id-ID")}</div>
        </div>
        {currentHistory.numChildren > 0 && (
          <div className="flex justify-between w-full">
            <div className="">{currentHistory.numChildren} Anak-anak</div>
            <div className="">
              IDR {childrenTotalPrice.toLocaleString("id-ID")}
            </div>
          </div>
        )}
        {currentHistory.numBabies > 0 && (
          <div className="flex justify-between w-full">
            <div className="">{currentHistory.numBabies} Bayi</div>
            <div className="">IDR 0</div>
          </div>
        )}
        <div className="flex justify-between w-full">
          <div className="">Pajak (11%)</div>
          <div className="">
            IDR{" "}
            {(
              (11 / 100) *
              (adultsTotalPrice + childrenTotalPrice)
            ).toLocaleString("id-ID")}
          </div>
        </div>
        <div className="flex justify-between font-bold w-full my-3 items-center">
          <div className="">Total</div>
          <div className="text-color-primary text-lg">
            IDR {currentHistory.payment?.paymentAmount.toLocaleString("id-ID")}
          </div>
        </div>

        {currentHistory.payment?.paymentStatus === "paid" ? (
          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={() => printTicket(currentHistory)}
          >
            Cetak Tiket
          </Button>
        ) : currentHistory.payment?.paymentStatus === "unpaid" ? (
          <Button disabled size="lg" variant="secondary" className="w-full">
            Cetak Tiket
          </Button>
        ) : (
          <Button size="lg" variant="primary" className="w-full">
            Lanjutkan pembayaran
          </Button>
        )}
      </div>
    </div>
  );
}

export default Detail;
