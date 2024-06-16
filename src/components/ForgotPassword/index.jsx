import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
// ASSETS
import bgAuth from "@/assets/images/bgauth.png";
//  COMPONENTS
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordService } from "@/services/user/auth/forgot-password";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

const ForgotPasswordComponent = () => {
  // Define Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Define submit handler.
  function onSubmit(values) {
    const data = forgotPasswordService({ email: values.email });

    if (data) {
      toast.success("Link Reset Password berhasil dikirim!", {
        description: "Cek email kamu sekarang",
      });
    }
  }

  return (
    <>
      <div className="flex-1 hidden md:block">
        <img
          src={bgAuth}
          alt="Background Auth"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex flex-col px-8 md:px-16 lg:px-32 justify-center h-full gap-10">
          <div>
            <h1 className="text-3xl font-bold">Forgot Password</h1>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-black">Email</FormLabel>
                    <FormControl>
                      <div className="relative flex flex-col">
                        <Input
                          placeholder="Masukkan email kamu"
                          type="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="italic" />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-color-primary hover:bg-hover-primary dark:bg-primary"
                type="submit"
              >
                Kirim
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;
