import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const SelectField = ({ name, label, datas, form, btnLabel }) => {
  const formatString = (string) => {
    return string
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col w-1/2 text-sm">
          <FormLabel className="flex gap-2 items-center font-normal text-[#8A8A8A]">
            {label}
          </FormLabel>
          <div className="flex flex-col w-full">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between rounded-none p-0 border-b-2 border-t-0 border-l-0 border-r-0",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? formatString(datas.find((data) => data === field.value))
                      : `${btnLabel}`}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="popover-full p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {datas.map((data, index) => (
                        <CommandItem
                          value={data}
                          key={index}
                          onSelect={() => {
                            form.setValue(`${name}`, data);
                            form.trigger(`${name}`);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === data ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {formatString(data)}
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
  );
};

export default SelectField;
