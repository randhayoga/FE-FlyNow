import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
// ASSETS
import bgAuth from "@/assets/images/bgauth.png";
// ICONS
import { Eye, EyeOff } from "lucide-react";
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
import { useParams } from "react-router-dom";
import { resetPasswordService } from "@/services/user/auth/reset-password";

const formSchema = z
  .object({
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "Konfirmasi Password minimal 6 karakter" }),
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: "Password tidak sama",
    path: ["passwordConfirmation"],
  });

const ResetPasswordComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const { token } = useParams();

  // Define Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  // Define submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    console.log(values);
    const { password, passwordConfirmation } = values;

    const data = resetPasswordService({
      token: token,
      password: password,
      confirmPassword: passwordConfirmation,
    });

    if (data) {
      toast.success("Reset Password Berhasil!", {
        description: "Silahkan Login kembali",
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
            <h1 className="text-3xl font-bold">Reset Password</h1>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-black">
                      Masukkan Password Baru
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex flex-col">
                        <Input
                          placeholder="**********"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        {!showPassword ? (
                          <Eye
                            className="text-slate-300 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                            size={28}
                          />
                        ) : (
                          <EyeOff
                            className="text-slate-300 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                            size={28}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="italic" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md text-black">
                      Ulangi Password Baru
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex flex-col">
                        <Input
                          placeholder="**********"
                          type={showPasswordConfirmation ? "text" : "password"}
                          {...field}
                        />
                        {!showPasswordConfirmation ? (
                          <Eye
                            className="text-slate-300 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() =>
                              setShowPasswordConfirmation(
                                !showPasswordConfirmation
                              )
                            }
                            size={28}
                          />
                        ) : (
                          <EyeOff
                            className="text-slate-300 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() =>
                              setShowPasswordConfirmation(
                                !showPasswordConfirmation
                              )
                            }
                            size={28}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="italic" />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-ColorPrimary dark:bg-primary"
                type="submit"
              >
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordComponent;
