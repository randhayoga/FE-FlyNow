import logoUrl from "@/assets/images/FlyNow-logo.svg";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/ui/button";

import { toast } from "sonner";
import Timer from "../components/Otp/Timer";
import { resendOtpService, verifyOtpService } from "../services/otp";

export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.isVerified) {
    return redirect("/?message=Anda sudah terverifikasi");
  }

  if (user?.isVerified === false) {
    await resendOtpService({ email: user.email });
    return null;
  }

  return null;
}

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time OTP must be 6 characters.",
  }),
});

const OtpPage = () => {
  const { state } = useLocation();
  if (state?.email) {
    localStorage.setItem("email", state.email);
  }
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const navigation = useNavigation();
  const navigate = useNavigate();

  const [resend, setResend] = useState(false);

  useEffect(() => {
    localStorage.setItem("email", state?.email || email);
    return () => {
      localStorage.removeItem("email");
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data) {
    try {
      await verifyOtpService({
        otp: data.otp,
        email,
      });
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Maaf, kode OTP salah!");
    }
  }

  return (
    <>
      <nav className="navbar mb-12 shadow-sm py-4 px-4 md:px-36">
        <img src={logoUrl} alt="FlyNow Logo" className="w-16" />
      </nav>
      <main className="max-w-screen-sm mx-auto flex items-center flex-col px-4">
        <div className="w-full flex mb-6">
          {/* TODO: Belum tahu harus balik kemana */}
          <Link to="/" className="text-primary">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="flex-grow text-center text-2xl font-bold">
            Masukkan OTP
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <FormField
              control={form.control}
              name="otp"
              className="flex gap-4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-normal text-center mb-11">
                    Ketik 6 digit kode yang dikirimkan ke{" "}
                    <span className="font-bold">
                      {email.replace(/(?<=..).(?=.*@)/g, "*")}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mb-11">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="block text-center font-semibold">
                    <Timer
                      setResend={setResend}
                      resend={resend}
                      email={email}
                    />
                  </FormDescription>
                  <FormMessage className="block text-center" />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-color-primary hover:bg-hover-primary"
              type="submit"
              disabled={navigation.state === "submitting"}
            >
              {navigation.state === "submitting"
                ? "Verify OTP Code..."
                : "Simpan"}
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default OtpPage;
