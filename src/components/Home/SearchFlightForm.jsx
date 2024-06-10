import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { MdOutlineDateRange, MdAirlineSeatReclineNormal } from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AirportField from "./AirportField";
import DateField from "./DateField";
import SelectField from "./SelectField";
import axios from "axios";
import PassengerField from "./PassengersField";

const formSchema = z.object({
  departureAirport: z.string().min(1, { message: "Please select an airport" }),
  arrivalAirport: z.string().min(1, { message: "Please select an airport" }),
  date: z.object({
    from: z.date({ message: "Please select a valid date" }),
    to: z.date({ message: "Please select a valid date" }).optional(),
  }),
  passengers: z.object({
    adult: z.number().min(1, { message: "Please select at least 1 adult" }),
    child: z.number().min(0, { message: "Please select at least 0 child" }),
    baby: z.number().min(0, { message: "Please select at least 0 baby" }),
  }),
  flightClass: z.string().min(1, { message: "Please select a class" }),
});

const SearchFlightForm = () => {
  // const getAirportsData = () => {
  //   const airports = axios.get("http://localhost:3000/api/airports");
  //   return airports;
  // }

  // useEffect(() => {
  //   console.log(getAirportsData());
  // }, [])

  const [isReturnEnabled, setIsReturnEnabled] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departureAirport: "",
      arrivalAirport: "",
      date: {
        from: "",
        to: "",
      },
      passengers: {
        adult: 1,
        child: 0,
        baby: 0,
      },
      flightClass: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    // Create query string from form values
    const query = new URLSearchParams({
      da: values.departureAirport,
      aa: values.arrivalAirport,
      dd: formatDate(values.date.from),
      rd: values.date.to ? formatDate(values.date.to) : "", // Because return date is optional
      adult: values.passengers.adult.toString(),
      child: values.passengers.child.toString(),
      baby: values.passengers.baby.toString(),
      class: values.flightClass,
    }).toString();

    // Redirect to search results page with query string
    navigate(`/flight/search?${query}`);
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
  };

  const handleSwitchRoundTripToggle = () => {
    setIsReturnEnabled(!isReturnEnabled);
  };

  const handleSwapAirports = () => {
    const { departureAirport, arrivalAirport } = form.getValues();

    form.setValue("departureAirport", arrivalAirport);
    form.setValue("arrivalAirport", departureAirport);
  };

  const airports = [
    {
      code: "CGK",
      name: "Soekarno Hatta",
      city: "Jakarta",
      country: "Indonesia",
    },
    {
      code: "LAX",
      name: "Los Angeles International",
      city: "Los Angeles",
      country: "United States",
    },
    {
      code: "HND",
      name: "Tokyo Haneda",
      city: "Tokyo",
      country: "Japan",
    },
    {
      code: "LHR",
      name: "Heathrow",
      city: "London",
      country: "United Kingdom",
    },
    {
      code: "DXB",
      name: "Dubai International",
      city: "Dubai",
      country: "United Arab Emirates",
    },
    {
      code: "SIN",
      name: "Changi",
      city: "Singapore",
      country: "Singapore",
    },
    {
      code: "SYD",
      name: "Sydney Kingsford Smith",
      city: "Sydney",
      country: "Australia",
    },
    {
      code: "JFK",
      name: "John F. Kennedy International",
      city: "New York",
      country: "United States",
    },
    {
      code: "CDG",
      name: "Charles de Gaulle",
      city: "Paris",
      country: "France",
    },
    {
      code: "HKG",
      name: "Hong Kong International",
      city: "Hong Kong",
      country: "China",
    },
  ];

  const flightClasses = ["economy", "business", "first_class"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:flex gap-4 w-full mb-3">
          <AirportField
            name="departureAirport"
            label="From"
            form={form}
            airports={airports}
          />
          <Button
            onClick={handleSwapAirports}
            type="button"
            className="lg:-mt-4 w-fit self-center rounded-full"
          >
            <HiOutlineSwitchHorizontal className="w-5 h-5" />
          </Button>
          <AirportField
            name="arrivalAirport"
            label="To"
            form={form}
            airports={airports}
          />
        </div>
        <div className="block gap-4 w-full mb-3 lg:flex">
          <div className="flex gap-8 w-1/2 items-start">
            <div className="flex gap-2 mt-3 items-center text-sm font-normal text-[#8A8A8A]">
              <MdOutlineDateRange className="w-6 h-6" /> <span>Date</span>
            </div>
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <div className="flex gap-5 flex-grow">
                  <DateField
                    label={"Departure"}
                    field={field}
                    value={field.value.from}
                    error={error}
                    errMessage={error?.from?.message}
                    form={form}
                    isReturnEnabled={isReturnEnabled}
                  />
                  {isReturnEnabled ? (
                    <DateField
                      label={"Return"}
                      field={field}
                      value={field.value.to}
                      error={error}
                      errMessage={error?.to?.message}
                      form={form}
                      isReturnEnabled={isReturnEnabled}
                    />
                  ) : (
                    <p className="text-right font-normal text-sm text-[#8A8A8A]">
                      Round Trip?
                    </p>
                  )}
                  <Switch
                    checked={isReturnEnabled}
                    onCheckedChange={handleSwitchRoundTripToggle}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-8 w-1/2 items-start">
            <div className="flex gap-2 mt-3 items-center text-sm font-normal text-[#8A8A8A]">
              <MdAirlineSeatReclineNormal className="w-6 h-6" /> <span>To</span>
            </div>
            <div className="flex w-full gap-5">
              <PassengerField form={form} name="passengers" />
              <SelectField
                form={form}
                datas={flightClasses}
                name={"flightClass"}
                label={"Seat Class"}
                btnLabel={"Pilih Kelas"}
              />
            </div>
          </div>
        </div>
        <Button
          className="w-full absolute -ms-6 rounded-b-xl rounded-t-none bg-ColorPrimary hover:bg-HoverPrimary text-white"
          type="submit"
        >
          Cari Penerbangan
        </Button>
      </form>
    </Form>
  );
};

export default SearchFlightForm;
