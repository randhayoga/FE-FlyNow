import { useEffect } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Check, CalendarIcon, ChevronDown } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

import countries from "@/lib/countries";

import formSchema from "./FormSchema";

const BookingForm = ({ passengers }) => {
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: [],
    },
  });

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      passengers: passengers.map(() => ({
        title: "",
        name: "",
        dateOfBirth: null,
        nationality: "",
        docType: "",
        docNumber: "",
        issuingCountry: "",
        expiryDate: null,
      })),
    });
  }, [passengers, form]);

  const { fields } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), "d LLL yyyy", { locale: id }) : "";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="border-2 border-[#8A8A8A] rounded-xl px-3 py-6 mb-6">
          <h1 className="text-lg font-bold tracking-wide mb-3">
            Isi Data Penumpang
          </h1>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-6">
              <Card className="border-none">
                <CardHeader className="flex flex-row justify-between w-full rounded-t-lg bg-[#3C3C3C] text-white px-4 py-3">
                  <p>
                    Data Diri Penumpang {passengers[index]?.index} -{" "}
                    {passengers[index]?.type}
                  </p>
                  <FaCheckCircle className="text-alert-success" />
                </CardHeader>
                <CardContent className="p-4">
                  <FormField
                    name={`passengers.${index}.title`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-color-primary font-bold text-base tracking-wide">
                          Title
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full px-4 py-5 text-left text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  `${field.value}`
                                ) : (
                                  <span>Pilih Title</span>
                                )}
                                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandGroup>
                                <CommandList>
                                  <CommandItem
                                    value="Mr. "
                                    onSelect={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === "Mr."
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    Mr.
                                  </CommandItem>
                                  <CommandItem
                                    value="Mrs. "
                                    onSelect={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === "Mr."
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    Mrs.
                                  </CommandItem>
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.name`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-color-primary font-bold text-base tracking-wide">
                          Nama Lengkap
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border py-2 rounded-md font-medium"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.dateOfBirth`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4 flex flex-col">
                        <FormLabel className="text-color-primary mb-1 font-bold text-base tracking-wide">
                          Tanggal Lahir
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full px-4 py-5 text-left text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  `${formatDate(field.value)}`
                                ) : (
                                  <span>Pilih Tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              initialFocus
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              locale={id}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name={`passengers.${index}.nationality`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-color-primary font-bold text-base tracking-wide">
                          Kewarganegaraan
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full px-4 py-5 text-left text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  `${field.value}`
                                ) : (
                                  <span>Pilih Negara</span>
                                )}
                                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandInput placeholder="Search Country..." />
                              <CommandEmpty>No Country found.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {countries &&
                                    countries.map((country) => (
                                      <CommandItem
                                        value={country}
                                        key={country}
                                        onSelect={() => {
                                          form.setValue(
                                            `passengers.${index}.nationality`,
                                            country
                                          );
                                          form.trigger(
                                            `passengers.${index}.nationality`
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            country === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {country}
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

                  <FormField
                    name={`passengers.${index}.docType`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-3 mb-3">
                        <FormLabel className="text-color-primary font-bold text-base tracking-wide">
                          KTP/Paspor
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={cn(
                              "flex flex-col",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="KTP" />
                              </FormControl>
                              <FormLabel className="font-medium text-base">
                                KTP
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Pasport" />
                              </FormControl>
                              <FormLabel className="font-medium text-base">
                                Pasport
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Kartu Keluarga" />
                              </FormControl>
                              <FormLabel className="font-medium text-base">
                                Kartu Keluarga
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch(`passengers.${index}.docType`) && (
                    <FormField
                      name={`passengers.${index}.docNumber`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormControl>
                            <Input
                              className="border py-2 rounded-md font-medium"
                              type="text"
                              placeholder={`Masukkan Nomor ${form.watch(
                                `passengers.${index}.docType`
                              )}`}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    name={`passengers.${index}.issuingCountry`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-color-primary font-bold text-base tracking-wide">
                          Negara Penerbit
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full px-4 py-5 text-left text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  `${field.value}`
                                ) : (
                                  <span>Pilih Negara</span>
                                )}
                                <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandInput placeholder="Search Country..." />
                              <CommandEmpty>No Country found.</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {countries &&
                                    countries.map((country) => (
                                      <CommandItem
                                        value={country}
                                        key={country}
                                        onSelect={() => {
                                          form.setValue(
                                            `passengers.${index}.issuingCountry`,
                                            country
                                          );
                                          form.trigger(
                                            `passengers.${index}.issuingCountry`
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            country === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {country}
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

                  <FormField
                    name={`passengers.${index}.expiryDate`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4 flex flex-col">
                        <FormLabel className="text-color-primary mb-1 font-bold text-base tracking-wide">
                          Berlaku Sampai
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full px-4 py-5 text-left text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  `${formatDate(field.value)}`
                                ) : (
                                  <span>Pilih Tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              initialFocus
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              locale={id}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </section>

        {/* {flightId && (
          <SeatPicker
            label={"Pilih Kursi"}
            flight={flight}
            maxSeats={passengers.length}
          />
        )} */}

        {/* {returnFlightId && (
                <SeatPicker
                  label={"Pilih Kursi Penerbangan Pulang"}
                  flight={returnFlight}
                  maxSeats={passengers.length}
                />
              )} */}
        <Button
          className="w-full bg-color-primary text-base hover:bg-hover-primary text-white"
          type="submit"
        >
          Simpan
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
