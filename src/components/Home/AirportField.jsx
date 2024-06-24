import {
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

import { cn } from "@/lib/utils";

import { Check } from "lucide-react";
import { MdFlightTakeoff } from "react-icons/md";

const AirportField = ({ name, label, form, airports, isLoading }) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="flex gap-8 w-full lg:w-1/2 overflow-x-hidden">
          <FormLabel className="flex gap-2 pt-4 text-sm font-normal text-[#8A8A8A]">
            <MdFlightTakeoff className="w-6 h-6" /> {label}
          </FormLabel>
          <div className="flex flex-col w-full">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between rounded-none p-0 border-b-2 border-t-0 border-l-0 border-r-0 text-base",
                      !field.value && "text-muted-foreground",
                      error && "border-red-500"
                    )}
                  >
                    {isLoading ? (
                      "Load Airports Data..."
                    ) : (
                      <p>
                        {field.value
                          ? `(${
                              airports.find(
                                (airport) =>
                                  airport?.airportCode === field.value
                              )?.airportCode
                            }) ${
                              airports.find(
                                (airport) =>
                                  airport?.airportCode === field.value
                              )?.airportName
                            }`
                          : "Pilih Bandara"}
                      </p>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="popover-full">
                <Command>
                  <CommandInput placeholder="Search Airport..." />
                  <CommandEmpty>No Airports found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {airports &&
                        airports.map((airport) => (
                          <CommandItem
                            value={airport?.airportCode}
                            key={airport?.airportCode}
                            onSelect={() => {
                              form.setValue(`${name}`, airport?.airportCode);
                              form.trigger(`${name}`);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                airport?.airportCode === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {`${airport.airportName} (${airport.airportCode}) - ${airport.city}, ${airport.country}`}
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
  );
};

export default AirportField;
