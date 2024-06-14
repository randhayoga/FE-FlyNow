import React from "react";
import { Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormLabel, FormMessage } from "@/components/ui/form";

import PassengerInput from "./PassengerInput";
import { cn } from "@/lib/utils";

const PassengerField = ({ form, name }) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState: { error } }) => {
        const { adult, child, baby } = field.value;
        const totalPassengers = adult + child + baby;

        return (
          <div className="flex flex-col w-1/2 gap-2 text-sm">
            <FormLabel className="flex gap-2 items-center font-normal text-[#8A8A8A]">
              Passenger
            </FormLabel>
            <div className="flex flex-col w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between rounded-none p-0 border-b-2 border-t-0 border-l-0 border-r-0",
                      totalPassengers === 0 && "text-muted-foreground",
                    )}
                  >
                    {`${totalPassengers} Penumpang`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 flex flex-col gap-2">
                  <PassengerInput
                    min={1}
                    label="Adult"
                    value={adult}
                    onChange={(newValue) => {
                      form.setValue(name, {
                        ...field.value,
                        adult: newValue,
                      });
                    }}
                  />
                  <PassengerInput
                    min={0}
                    label="Child"
                    value={child}
                    onChange={(newValue) => {
                      form.setValue(name, {
                        ...field.value,
                        child: newValue,
                      });
                    }}
                  />
                  <PassengerInput
                    min={0}
                    label="Baby"
                    value={baby}
                    onChange={(newValue) => {
                      form.setValue(name, {
                        ...field.value,
                        baby: newValue,
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="italic mt-1">
                {error?.adult?.message}
              </FormMessage>
            </div>
          </div>
        );
      }}
    />
  );
};

export default PassengerField;
