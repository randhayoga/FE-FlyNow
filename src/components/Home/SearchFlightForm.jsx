import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
// import { ScrollArea } from "@/components/ui/scroll-area";

import { useForm } from "react-hook-form";

import {
  MdFlightTakeoff,
  MdOutlineDateRange,
  MdAirlineSeatReclineNormal,
} from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { Check, ChevronsUpDown } from "lucide-react";

const SearchFlightForm = () => {
  const [isReturnEnabled, setIsReturnEnabled] = useState(false);

  const form = useForm({
    defaultValues: {
      departureAirport: "",
      arrivalAirport: "",
      departureTime: "",
      arrivalTime: "",
      numOfPassengers: "",
      seatClass: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleSwitchToggle = () => {
    setIsReturnEnabled(!isReturnEnabled);
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4 items-center w-full mb-6">
          <FormField
            name="departureAirport"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-4 flex-grow">
                <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                  <MdFlightTakeoff className="w-6 h-6" /> From
                </FormLabel>
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
                          ? `${airports.find(
                              (airport) => airport?.name === field.value
                            )?.name} (${airports.find(
                              (airport) => airport?.name === field.value
                            )?.code})`
                          : "Select Airport"}
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
                              value={airport?.name}
                              key={airport?.code}
                              onSelect={() => {
                                form.setValue(
                                  "departureAirport",
                                  airport?.name
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  airport?.name === field.value
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
              </FormItem>
            )}
          />
          <Button className="mt-2">
            <HiOutlineSwitchHorizontal className="w-5 h-5" />
          </Button>
          <FormField
            name="arrivalAirport"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex gap-4 flex-grow">
                <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                  <MdFlightTakeoff className="w-6 h-6" /> To
                </FormLabel>
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
                          ? `${airports.find(
                              (airport) => airport?.name === field.value
                            )?.name} (${airports.find(
                              (airport) => airport?.name === field.value
                            )?.code})`
                          : "Select Airport"}
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
                              value={airport?.name}
                              key={airport?.code}
                              onSelect={() => {
                                form.setValue(
                                  "arrivalAirport",
                                  airport?.name
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  airport?.name === field.value
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
              </FormItem>
            )}
          />
        </div>
        <div className="block gap-4 items-center w-full mb-6 lg:flex">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center text-[#8A8A8A]">
              <MdOutlineDateRange className="w-6 h-6" />{" "}
              <span className="font-medium text-sm">Date</span>
            </div>
            <FormField
              name="departureTime"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-col gap-2">
                  <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                    Departure
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center">
              {isReturnEnabled ? (
                <FormField
                  name="arrivalTime"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-col gap-2">
                      <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                        Return
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <p className="text-right font-medium text-sm text-[#8A8A8A]">
                  Round Trip?
                </p>
              )}
              <Switch
                checked={isReturnEnabled}
                onCheckedChange={handleSwitchToggle}
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center text-[#8A8A8A]">
              <MdAirlineSeatReclineNormal className="w-6 h-6" />{" "}
              <span className="font-medium text-sm">To</span>
            </div>
            <FormField
              name="numOfPassengers"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-col gap-2">
                  <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                    Passengers
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="seatClass"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-col gap-2">
                  <FormLabel className="flex gap-2 items-center text-[#8A8A8A]">
                    Seat Class
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
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
