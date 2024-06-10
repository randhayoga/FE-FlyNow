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

import { Check, ChevronsUpDown } from "lucide-react";
import { MdFlightTakeoff } from "react-icons/md";

const AirportField = ({ name, label, form, airports }) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex gap-4 flex-grow">
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
                            form.setValue(`${name}`, airport?.code);
                            form.trigger(`${name}`);
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
  );
};

export default AirportField;
