import { z } from "zod";

const formSchema = z.object({
  departureAirport: z.string().min(1, { message: "Please select an airport" }),
  arrivalAirport: z.string().min(1, { message: "Please select an airport" }),
  date: z.object({
    from: z.date({ message: "Please select a valid date" }),
    to: z.date({ message: "Please select a valid date" }).optional(),
  }),
  passengers: z.object({
    adult: z.number().min(1, { message: "Please select at least 1 adult" }),
    child: z.number().min(0, { message: "Please select at least 0 child" }),
    baby: z.number().min(0, { message: "Please select at least 0 baby" }),
  }),
  flightClass: z.string().min(1, { message: "Please select a class" }),
});

export default formSchema