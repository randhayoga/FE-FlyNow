import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

const DateField = ({ label, field, value, error, form, isReturnEnabled }) => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "LLL dd, y") : "Pilih Tanggal";
  };

  return (
    <div className="flex flex-col w-full gap-2 text-sm font-medium">
      <span className="text-[#8A8A8A]">{label}</span>
      <div className="flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "justify-start text-left",
                  !value && "text-muted-foreground"
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
                } else {
                  form.setValue("date", { from: selected });
                }
              }}
              numberOfMonths={isReturnEnabled ? 2 : 1}
            />
          </PopoverContent>
        </Popover>
        <FormMessage className="italic mt-1">{error}</FormMessage>
      </div>
    </div>
  );
};

export default DateField;
