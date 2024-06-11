import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

const DateField = ({ label, field, value, error, errMessage, form, isReturnEnabled }) => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "LLL dd, y") : "Pilih Tanggal";
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <FormLabel className="font-normal text-[#8A8A8A]">{label}</FormLabel>
      <div className="flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between rounded-none p-0 border-b-2 border-t-0 border-l-0 border-r-0",
                  !value && "text-muted-foreground",
                  error && "border-red-500"
                )}
              >
                {isReturnEnabled
                  ? field.value && value
                    ? `${formatDate(value)}`
                    : "Pilih Tanggal"
                  : formatDate(value)}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode={isReturnEnabled ? "range" : "single"}
              selected={field.value}
              onSelect={(selected) => {
                if (isReturnEnabled) {
                  form.setValue("date", selected);
                  form.trigger("date");
                } else {
                  form.setValue("date", { from: selected });
                  form.trigger("date");
                }
              }}
              numberOfMonths={isReturnEnabled ? 2 : 1}
            />
          </PopoverContent>
        </Popover>
        <FormMessage className="italic mt-1">{errMessage}</FormMessage>
      </div>
    </div>
  );
};

export default DateField;
