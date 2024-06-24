import { z } from "zod";

const REQUIRED_ERROR = "This field is required";

const passengerSchema = z.object({
  type: z.enum(["Adult", "Children", "Baby"], {
    message: REQUIRED_ERROR,
  }),
  title: z.string().min(1, REQUIRED_ERROR),
  name: z.string().min(1, REQUIRED_ERROR),
  dateOfBirth: z.date({ message: "Please select a valid date" }),
  nationality: z.string().min(1, REQUIRED_ERROR),
  docType: z.enum(["ktp", "paspor", "kartu_keluarga"], {
    message: REQUIRED_ERROR,
  }),
  docNumber: z
    .string({ message: REQUIRED_ERROR })
    .min(16, "Document number length should be exact 16 digit")
    .max(16, "Document number length should be exact 16 digit"),
  issuingCountry: z.string().min(1, REQUIRED_ERROR),
  expiryDate: z.date({ message: "Please select a valid date" }),
});

const formSchema = z.object({
  passengers: z.array(passengerSchema),
});

export default formSchema;
