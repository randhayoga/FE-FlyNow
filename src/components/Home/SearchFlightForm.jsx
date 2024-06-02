import { useState } from "react";
import {
  MdFlightTakeoff,
  MdOutlineDateRange,
  MdAirlineSeatReclineNormal,
} from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { useForm } from "react-hook-form";

const SearchFlightForm = () => {
  const [isReturnEnabled, setIsReturnEnabled] = useState(false);

  const form = useForm({
    defaultValues: {
      departure: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleSwitchToggle = () => {
    setIsReturnEnabled(!isReturnEnabled);
  };

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
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
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
              )
              :
              <p className="font-medium text-sm text-[#8A8A8A]">Round Trip?</p>
            }
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
              name="passengers"
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
