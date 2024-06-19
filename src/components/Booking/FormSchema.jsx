import { z } from "zod";

const passengerSchema = z.object({
  // title: z.string().min(1, "Title is required"),
  // name: z.string().min(1, "Name is required"),
  // dob: z.date({ message: "Please select a valid date" }),
  // nationality: z.string().min(1, "Nationality is required"),
  // docType: z.enum(["ktp", "paspor"], {
  //   message: "Document type is required",
  // }),
  // docNumber: z.string().min(16, "Document number is required"),
  // issuingCountry: z.string().min(1, "Issuing country is required"),
  // expiryDate: z.date({ message: "Please select a valid date" }),
});

const formSchema = z.object({
  passengers: z.array(passengerSchema),
});

export default formSchema;
