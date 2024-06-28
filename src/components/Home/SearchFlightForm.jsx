import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAirports } from "../../../redux/actions/flight";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import AirportField from "./AirportField";
import DateField from "./DateField";
import SelectField from "./SelectField";
import PassengerField from "./PassengersField";
import formSchema from "./FormSchema";

import { MdOutlineDateRange, MdAirlineSeatReclineNormal } from "react-icons/md";
import {
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
} from "react-icons/hi";

import { zodResolver } from "@hookform/resolvers/zod";

const SearchFlightForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { airports } = useSelector((state) => state.flights) || [];
  const [isLoading, setIsLoading] = useState(false);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    dispatch(getAirports(setIsLoading));
  }, [dispatch]);

  // Load default values from localStorage if available
  const savedFormValues = JSON.parse(localStorage.getItem("formValues")) || {
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
  };

  // Convert stored date strings back to Date objects
  if (savedFormValues.date.from) {
    savedFormValues.date.from = new Date(savedFormValues.date.from);
  }
  if (savedFormValues.date.to) {
    savedFormValues.date.to = new Date(savedFormValues.date.to);
  }

  // Set initial state for isReturnEnabled based on the presence of saved return date
  const [isReturnEnabled, setIsReturnEnabled] = useState(
    !!savedFormValues.date.to
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: savedFormValues,
  });

  const onSubmit = (values) => {
    // Remove date.to from form values if return trip is disabled
    if (!isReturnEnabled) {
      values.date.to = undefined;
    }

    const queryObj = {
      da: values.departureAirport,
      aa: values.arrivalAirport,
      dd: formatDate(values.date.from),
      adult: values.passengers.adult.toString(),
      children: values.passengers.child.toString(),
      baby: values.passengers.baby.toString(),
      class: values.flightClass,
    };

    // Add rd to queryObj only if return date is provided and isReturnEnabled
    if (values.date.to && isReturnEnabled) {
      queryObj.rd = formatDate(values.date.to);
    }

    // Set query params
    const query = new URLSearchParams(queryObj).toString();

    // Save old values to local storage
    localStorage.setItem("formValues", JSON.stringify(values));

    // Redirect to search results page with query string
    navigate(`/flight/search?${query}`);
  };

  const formatDate = (date) => {
    if (!date) return null;

    // Fix Timezone Issues
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
  };

  const handleSwitchRoundTripToggle = () => {
    // Clear return date value when disabling return trip
    if (!isReturnEnabled) {
      form.setValue("date.to", undefined);
    }
    setIsReturnEnabled(!isReturnEnabled);
  };

  const handleSwapAirports = () => {
    const { departureAirport, arrivalAirport } = form.getValues();

    form.setValue("departureAirport", arrivalAirport);
    form.setValue("arrivalAirport", departureAirport);
  };

  const flightClasses = ["economy", "business", "first_class"];

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-4 w-full mb-3">
          <AirportField
            name="departureAirport"
            label="From"
            form={form}
            airports={airports}
            isLoading={isLoading}
          />
          <Button
            onClick={handleSwapAirports}
            type="button"
            className="lg:-mt-4 w-full lg:w-fit self-center rounded-full bg-color-primary hover:bg-hover-primary"
          >
            {isVertical ? (
              <div className="flex items-center gap-2">
                <span>Switch Airport</span>
                <HiOutlineSwitchVertical className="w-5 h-5" />
              </div>
            ) : (
              <HiOutlineSwitchHorizontal className="w-5 h-5" />
            )}
          </Button>
          <AirportField
            name="arrivalAirport"
            label="To"
            form={form}
            airports={airports}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 w-full mb-3 lg:flex">
          <div className="flex gap-8 w-full lg:w-1/2 items-start">
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
                    className="data-[state=checked]:bg-color-primary"
                    checked={isReturnEnabled}
                    onCheckedChange={handleSwitchRoundTripToggle}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex gap-8 w-full lg:w-1/2 items-start">
            <div className="flex gap-2 mt-3 lg:ps-9 items-center text-sm font-normal text-[#8A8A8A]">
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
          className="w-full absolute -ms-6 rounded-b-xl rounded-t-none bg-color-primary hover:bg-hover-primary text-white"
          type="submit"
        >
          Cari Penerbangan
        </Button>
      </form>
    </Form>
  );
};

export default SearchFlightForm;
