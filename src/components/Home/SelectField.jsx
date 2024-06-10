import { Button } from "@/components/ui/button";
import {
  FormControl,
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

const SelectField = ({ label, field, datas, value, form, btnLabel }) => {
  return (
    <FormItem className="flex-col flex-grow gap-2 text-sm">
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
                  "justify-between",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value
                  ? datas.find((data) => data === field.value).replace("_", " ")
                  : `${btnLabel}`}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {datas.map((data, index) => (
                    <CommandItem
                      value={data}
                      key={index}
                      onSelect={() => {
                        form.setValue(value, data);
                        form.trigger(value);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === data ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {data.replace("_", " ")}
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
  );
};

export default SelectField;
