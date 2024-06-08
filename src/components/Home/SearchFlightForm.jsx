import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
// import { ScrollArea } from "@/components/ui/scroll-area";

import {
  MdFlightTakeoff,
  MdOutlineDateRange,
  MdAirlineSeatReclineNormal,
} from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import { Calendar as CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  departureAirport: z.string().min(1, { message: "Please select an airport" }),
  arrivalAirport: z.string().min(1, { message: "Please select an airport" }),
  date: z.object({
    from: z.date({ message: "Please select a departure date" }),
    to: z.date({ message: "Please select a return date" }).optional(),
  }),
  passengers: z.object({
    adult: z.number().min(1, { message: "Please select at least 1 adult" }),
    child: z.number().min(0, { message: "Please select at least 0 child" }),
    baby: z.number().min(0, { message: "Please select at least 0 baby" }),
  }),
  flightClass: z.string().min(1, { message: "Please select a class" }),
});

const SearchFlightForm = () => {
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
      adult: values.passengers.adult,
      child: values.passengers.child,
      baby: values.passengers.baby,
      class: values.flightClass,
    }).toString();

    // Redirect to search results page with query string
    navigate(`/flight/search?${query}`);
  };

  // Custom component for passenger input with increment and decrement buttons
  const PassengerInput = ({ label, value, onChange }) => (
    <div className="flex items-center gap-2">
      <FormLabel>{label}</FormLabel>
      <button
        type="button"
        className="px-2 py-1 border rounded-l disabled:opacity-50"
        onClick={() => onChange(value - 1)}
        disabled={value === 0}
      >
        -
      </button>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-16 text-right"
        readOnly
      />
      <button
        type="button"
        className="px-2 py-1 border rounded-r"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );

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
          <FormField
            name="departureAirport"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-4 flex-grow">
                <FormLabel className="flex gap-2 pt-4 text-sm font-medium text-[#8A8A8A]">
                  <MdFlightTakeoff className="w-6 h-6" /> From
                </FormLabel>
                <div className="flex flex-col w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? `${
                                airports.find(
                                  (airport) => airport?.code === field.value
                                )?.name
                              } (${
                                airports.find(
                                  (airport) => airport?.code === field.value
                                )?.code
                              })`
                            : "Pilih Bandara"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Search Airport..." />
                        <CommandEmpty>No Airports found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {airports.map((airport) => (
                              <CommandItem
                                value={airport?.code}
                                key={airport?.code}
                                onSelect={() => {
                                  form.setValue(
                                    "departureAirport",
                                    airport?.code
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    airport?.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`${airport.name} (${airport.code}) - ${airport.city}, ${airport.country}`}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="italic mt-1" />
                </div>
              </FormItem>
            )}
          />
          <Button
            onClick={handleSwapAirports}
            type="button"
            className="lg:-mt-4 w-fit self-center"
          >
            <HiOutlineSwitchHorizontal className="w-5 h-5" />
          </Button>
          <FormField
            name="arrivalAirport"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-4 flex-grow">
                <FormLabel className="flex gap-2 pt-4 text-sm font-medium text-[#8A8A8A]">
                  <MdFlightTakeoff className="w-6 h-6" /> To
                </FormLabel>
                <div className="flex flex-col w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full max-w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? `${
                                airports.find(
                                  (airport) => airport?.code === field.value
                                )?.name
                              } (${
                                airports.find(
                                  (airport) => airport?.code === field.value
                                )?.code
                              })`
                            : "Pilih Bandara"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput placeholder="Search Airport..." />
                        <CommandEmpty>No Airports found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {airports.map((airport) => (
                              <CommandItem
                                value={airport?.code}
                                key={airport?.code}
                                onSelect={() => {
                                  form.setValue(
                                    "arrivalAirport",
                                    airport?.code
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    airport?.code === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`${airport.name} (${airport.code}) - ${airport.city}, ${airport.country}`}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="italic mt-1" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="block gap-4 w-full mb-3 lg:flex">
          <div className="flex gap-4 w-1/2 items-center">
            <div className="flex gap-2 items-center text-sm font-medium text-[#8A8A8A]">
              <MdOutlineDateRange className="w-6 h-6" /> <span>Date</span>
            </div>
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState: { error } }) => (
                <div className="flex gap-2 flex-grow">
                  <div className="flex flex-col w-full gap-2 text-sm font-medium">
                    <span className="text-[#8A8A8A]">Departure</span>
                    <div className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-start text-left",
                                !field.value?.from && "text-muted-foreground"
                              )}
                            >
                              {field.value?.from
                                ? format(field.value?.from, "LLL dd, y")
                                : "Pilih Tanggal"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode={isReturnEnabled ? "range" : "single"}
                            selected={field.value}
                            onSelect={(range) => {
                              {
                                if (isReturnEnabled) {
                                  form.setValue("date", range);
                                } else {
                                  form.setValue("date", { from: range });
                                }
                              }
                            }}
                            numberOfMonths={isReturnEnabled ? 2 : 1}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="italic mt-1">
                        {error?.from.message}
                      </FormMessage>
                    </div>
                  </div>
                  {isReturnEnabled ? (
                    <div className="flex flex-col w-full gap-2 text-sm font-medium">
                      <span className="text-[#8A8A8A]">Return</span>
                      <div className="flex flex-col w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-start text-left",
                                !field.value?.to && "text-muted-foreground"
                              )}
                            >
                              {field.value?.to
                                ? format(field.value.to, "LLL dd, y")
                                : "Pilih Tanggal"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              selected={field.value}
                              onSelect={(range) => {
                                form.setValue("date", range);
                              }}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="italic mt-1">
                          {error?.to.message}
                        </FormMessage>
                      </div>
                    </div>
                  ) : (
                    <p className="text-right font-medium text-sm text-[#8A8A8A]">
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
          <div className="flex gap-4 w-1/2 items-center">
            <div className="flex gap-2 items-center text-sm font-medium text-[#8A8A8A]">
              <MdAirlineSeatReclineNormal className="w-6 h-6" /> <span>To</span>
            </div>
            <Controller
              name="passengers"
              control={form.control}
              render={({ field, fieldState: { error } }) => {
                const { adult, child, baby } = field.value;
                const totalPassengers = adult + child + baby;
                return (
                  <div className="flex gap-2 flex-grow flex-col text-sm font-medium">
                    <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                      Passenger
                    </FormLabel>
                    <div className="flex flex-col w-full">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-start text-left",
                              totalPassengers === 0 && "text-muted-foreground"
                            )}
                          >
                            {totalPassengers > 0
                              ? `${totalPassengers} Penumpang`
                              : "Penumpang"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-4 flex flex-col gap-2"
                          align="start"
                        >
                          <PassengerInput
                            label="Adult"
                            value={adult}
                            onChange={(newValue) => {
                              form.setValue("passengers", {
                                ...field.value,
                                adult: newValue,
                              });
                            }}
                          />
                          <PassengerInput
                            label="Child"
                            value={child}
                            onChange={(newValue) => {
                              form.setValue("passengers", {
                                ...field.value,
                                child: newValue,
                              });
                            }}
                          />
                          <PassengerInput
                            label="Baby"
                            value={baby}
                            onChange={(newValue) => {
                              form.setValue("passengers", {
                                ...field.value,
                                baby: newValue,
                              });
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="italic mt-1">
                        {error?.adult.message}
                      </FormMessage>
                    </div>
                  </div>
                );
              }}
            />
            <FormField
              name="flightClass"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-col flex-grow gap-2 text-sm font-medium">
                  <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                    Seat Class
                  </FormLabel>
                  <div className="flex flex-col w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? flightClasses
                                  .find(
                                    (flightClass) => flightClass === field.value
                                  )
                                  .replace("_", " ")
                              : "Pilih Kelas"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandEmpty>No Flight found.</CommandEmpty>
                            <CommandGroup>
                              {flightClasses.map((flightClass, index) => (
                                <CommandItem
                                  value={flightClass}
                                  key={index}
                                  onSelect={() => {
                                    form.setValue("flightClass", flightClass);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === flightClass
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {flightClass.replace("_", " ")}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="italic mt-1" />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full" type="submit">
          Cari Penerbangan
        </Button>
      </form>
    </Form>
  );
};

export default SearchFlightForm;
