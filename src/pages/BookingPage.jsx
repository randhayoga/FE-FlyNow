import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";

import { profile } from "../../redux/actions/auth";
import { getFlightDetail } from "../../redux/actions/flight";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import SeatPicker from "@/components/Booking/SeatPicker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { CalendarIcon, Check, ChevronDown } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

import countries from "@/lib/countries";
import { toast } from "sonner";

export const loader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return redirect("/login");
  }

  if (!user?.phoneNumber || !user?.isVerified) {
    const message =
      !user.phoneNumber && !user.isVerified
        ? "Anda harus verifikasi otp dan menambahkan nomor telepon terlebih dahulu!"
        : !user.phoneNumber
        ? "Anda harus menambahkan nomor telepon terlebih dahulu!"
        : !user.isVerified
        ? "Anda harus verifikasi otp terlebih dahulu!"
        : null;

    return redirect(`/profile?message=${message}`);
  }
  return null;
};

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const { flight } = useSelector((state) => state.flights);

  const [searchParams] = useSearchParams();
  const [passengers, setPassengers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const flightId = parseInt(searchParams.get("df"));
  const adult = parseInt(searchParams.get("adult")) || 0;
  const children = parseInt(searchParams.get("children")) || 0;
  const baby = parseInt(searchParams.get("baby")) || 0;

  const priceAdult = flight?.price * adult || 0;
  const priceChildren = flight?.price * children * 0.7 || 0;
  const tax = 0.11 * (priceAdult + priceChildren);
  const totalPrice = priceAdult + priceChildren + tax;

  useEffect(() => {
    dispatch(profile(null, null, null));
  }, [dispatch, token]);

  useEffect(() => {
    if (flightId) {
      dispatch(getFlightDetail(flightId));
    }
  }, [dispatch, flightId]);

  useEffect(() => {
    const params = {
      adult,
      children,
      baby,
    };

    const passengerArray = [];
    for (let i = 0; i < params.adult; i++) {
      passengerArray.push({ type: "Adult", index: i + 1 });
    }
    for (let i = 0; i < params.children; i++) {
      passengerArray.push({ type: "Child", index: i + 1 + params.adult });
    }
    for (let i = 0; i < params.baby; i++) {
      passengerArray.push({
        type: "Baby",
        index: i + 1 + params.adult + params.children,
      });
    }

    setPassengers(passengerArray);
  }, [searchParams]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
          toast.error("Waktu pemesanan habis");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formSchema = z.object({
    passengers: z.array(
      z.object({
        docType: z.enum(["ktp", "paspor"]),
        docNumber: z.string().min(1, "Nomor KTP/Paspor tidak boleh kosong"),
      })
    ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameOrderer: user?.name || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      passengers: passengers.map(() => ({ docType: "ktp", docNumber: "" })),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const formatDate = (date) => {
    return date ? format(new Date(date), "d LLL yyyy", { locale: id }) : "";
  };

  return (
    <div className="flex flex-col mx-auto w-4/5 min-h-screen items-center pt-24">
      <div className="w-full font-semibold tracking-wide mb-6 bg-white">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold cursor-default">
                Isi Data Diri
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/flight/payment">Bayar</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/flight/payment/success">Selesai</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full flex justify-center items-center rounded-xl py-3 font-normal text-base bg-red-600 text-white">
          Selesaikan dalam 00:{formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row">
        <div className="lg:w-3/5 p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <section className="border-2 border-[#8A8A8A] rounded-xl px-3 py-6 mb-6">
                <h1 className="text-lg font-semibold tracking-wide mb-3">
                  Isi Data Pemesan
                </h1>
                <Card className="border-none">
                  <CardHeader className="flex flex-row justify-between w-full rounded-t-lg bg-[#3C3C3C] text-white px-4 py-3">
                    <p>Data Diri Pemesan</p>
                    <FaCheckCircle className="text-alert-success" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <FormField
                      name="nameOrderer"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-color-primary font-semibold tracking-wide">
                            Nama Lengkap
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              className="border py-2 rounded-md font-medium"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="phoneNumber"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-color-primary font-semibold tracking-wide">
                            Nomor Telepon
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              className="border py-2 rounded-md font-medium"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-color-primary font-semibold tracking-wide">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              className="border py-2 rounded-md font-medium"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </section>
              <section className="border-2 border-[#8A8A8A] rounded-xl px-3 py-6 mb-6">
                <h1 className="text-lg font-semibold tracking-wide mb-3">
                  Isi Data Penumpang
                </h1>
                {passengers &&
                  passengers.map((passenger, index) => (
                    <div key={index} className="mb-6">
                      <Card className="border-none">
                        <CardHeader className="flex flex-row justify-between w-full rounded-t-lg bg-[#3C3C3C] text-white px-4 py-3">
                          <p>
                            Data Diri Penumpang {passenger.index} -{" "}
                            {passenger.type}
                          </p>
                          <FaCheckCircle className="text-alert-success" />
                        </CardHeader>
                        <CardContent className="p-4">
                          <FormField
                            name={`title-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="text-color-primary font-semibold tracking-wide">
                                  Title
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger
                                      className={cn(
                                        "px-4 py-5 font-medium text-base",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <SelectValue placeholder="Pilih Title" />
                                      <ChevronDown className="h-4 w-4 opacity-50" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Mr.">Mr.</SelectItem>
                                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            name={`name-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="text-color-primary font-semibold tracking-wide">
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
                            name={`dob-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="mb-4 flex flex-col">
                                <FormLabel className="text-color-primary mb-1 font-semibold tracking-wide">
                                  Tanggal Lahir
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full px-4 py-5 text-left text-base",
                                          !field.value &&
                                            "text-muted-foreground"
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
                            name={`nationality-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="text-color-primary font-semibold tracking-wide">
                                  Kewarganegaraan
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full px-4 py-5 text-left text-base",
                                          !field.value &&
                                            "text-muted-foreground"
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
                                      <CommandEmpty>
                                        No Country found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        <CommandList>
                                          {countries &&
                                            countries.map((country, index) => (
                                              <CommandItem
                                                value={country}
                                                key={index}
                                                onSelect={() => {
                                                  form.setValue(
                                                    `nationality-${passenger.index}`,
                                                    country
                                                  );
                                                  form.trigger(
                                                    `nationality-${passenger.index}`
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
                            name={`docType-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="space-y-3 mb-3">
                                <FormLabel className="text-color-primary font-semibold tracking-wide">
                                  KTP/Paspor
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col"
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

                          {form.watch(`docType-${passenger.index}`) && (
                            <FormField
                              name={`docNumber-${passenger.index}`}
                              control={form.control}
                              render={({ field }) => (
                                <FormItem className="mb-4">
                                  <FormControl>
                                    <Input
                                      className="border py-2 rounded-md font-medium"
                                      type="text"
                                      placeholder={`Masukkan Nomor ${form.watch(
                                        `docType-${passenger.index}`
                                      )}`}
                                      {...field}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}

                          <FormField
                            name={`issuingCountry-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="mb-4">
                                <FormLabel className="text-color-primary font-semibold tracking-wide">
                                  Negara Penerbit
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full px-4 py-5 text-left text-base",
                                          !field.value &&
                                            "text-muted-foreground"
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
                                      <CommandEmpty>
                                        No Country found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        <CommandList>
                                          {countries &&
                                            countries.map((country, index) => (
                                              <CommandItem
                                                value={country}
                                                key={index}
                                                onSelect={() => {
                                                  form.setValue(
                                                    `issuingCountry-${passenger.index}`,
                                                    country
                                                  );
                                                  form.trigger(
                                                    `issuingCountry-${passenger.index}`
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
                            name={`expiryDate-${passenger.index}`}
                            control={form.control}
                            render={({ field }) => (
                              <FormItem className="mb-4 flex flex-col">
                                <FormLabel className="text-color-primary mb-1 font-semibold tracking-wide">
                                  Berlaku Sampai
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full px-4 py-5 text-left text-base",
                                          !field.value &&
                                            "text-muted-foreground"
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
              <section className="border-2 border-[#8A8A8A] rounded-xl px-3 py-6 mb-6">
                <SeatPicker flight={flight} maxSeats={passengers.length} />
              </section>
              <Button
                className="w-full bg-color-primary hover:bg-hover-primary text-white"
                type="submit"
              >
                Simpan
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:w-2/5 p-3">
          <h1 className="font-semibold tracking-wide text-lg mb-1">
            Detail Penerbangan
          </h1>
          {flight && (
            <>
              <section>
                <div className="flex w-full justify-between items-center font-semibold tracking-wide">
                  <p className="text-lg">
                    {flight?.departureTime?.substring(11, 16)}
                  </p>
                  <p className="text-sm text-color-primary">Keberangkatan</p>
                </div>
                <p className="font-normal">
                  {formatDate(flight?.departureTime?.substring(0, 10))}
                </p>
                <p className="font-medium">
                  {flight?.departureAirport?.airportName} - {flight?.terminal}
                </p>
              </section>
              <Separator className="my-4" />
              <section className="flex w-full gap-2">
                <div className="flex w-6 justify-center items-center">
                  <img src={flight?.airline?.image} className="w-6" />
                </div>
                <div className="flex-grow font-semibold tracking-wide">
                  <p>
                    {flight?.airline?.airlineName} - {flight?.flightClass}
                  </p>
                  <p className="mb-4">
                    {flight?.flightCode?.replace(/([A-Za-z]+)(\d+)/, "$1 - $2")}
                  </p>
                  <p>Informasi:</p>
                  {flight?.information?.split(", ").map((info, index) => (
                    <p className="font-normal text-sm" key={index}>
                      {info}
                    </p>
                  ))}
                </div>
              </section>
              <Separator className="my-4" />
              <section>
                <div className="flex w-full justify-between items-center font-semibold tracking-wide">
                  <p className="text-lg">
                    {flight?.arrivalTime?.substring(11, 16)}
                  </p>
                  <p className="text-sm text-color-primary">Kedatangan</p>
                </div>
                <p className="font-normal">
                  {formatDate(flight?.arrivalTime?.substring(0, 10))}
                </p>
                <p className="font-medium">
                  {flight?.arrivalAirport?.airportName}
                </p>
              </section>
              <Separator className="my-4" />
              <section>
                <p className="font-semibold tracking-wide">Rincian Harga</p>
                <div className="flex w-full justify-between items-center">
                  <p>{adult} Adult</p>
                  <p>IDR {priceAdult.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p>{children} Children</p>
                  <p>IDR {priceChildren.toLocaleString("id-ID")}</p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p>{baby} Babies</p>
                  <p>IDR 0</p>
                </div>
                <div className="flex w-full justify-between items-center">
                  <p>Tax (11%)</p>
                  <p>IDR {tax.toLocaleString("id-ID")}</p>
                </div>
                <Separator className="my-4" />
                <section className="font-semibold tracking-wide">
                  <div className="flex w-full justify-between items-center">
                    <p>Total</p>
                    <p className="text-xl text-color-primary">
                      IDR {totalPrice.toLocaleString("id-ID")}
                    </p>
                  </div>
                </section>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
