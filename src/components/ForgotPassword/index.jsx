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
    // Do something with the form values.
    console.log(values);

    toast.success("Link Reset Password berhasil dikirim!", {
      description: "Cek email kamu sekarang",
    });
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
                className="w-full bg-primary dark:bg-primary"
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

  //   NOTE: WITHOUT SHADCN FORM
  //   return (
  //     <>
  //       <div className="flex-1 hidden md:block">
  //         <img
  //           src={bgAuth}
  //           alt="Background Auth"
  //           className="object-cover w-full h-full"
  //         />
  //       </div>
  //       <div className="flex-1 flex flex-col min-h-screen">
  //         <div className="flex flex-col px-8 md:px-16 lg:px-32 justify-center h-full gap-10">
  //           <div>
  //             <h1 className="text-3xl font-bold">Reset Password</h1>
  //           </div>
  //           <div className="flex flex-col gap-6">
  //             <div className="flex flex-col gap-2">
  //               <p>Masukkan Password Baru</p>
  //               <div className="relative flex flex-col">
  //                 <input
  //                   type={showPassword ? "text" : "password"}
  //                   className="py-3 px-4 rounded-xl border-[3px] border-slate-300 outline-none focus:border-[#30628C]"
  //                 />
  //                 {!showPassword ? (
  //                   <Eye
  //                     className="text-slate-400 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
  //                     onClick={() => setShowPassword(!showPassword)}
  //                     size={28}
  //                   />
  //                 ) : (
  //                   <EyeOff
  //                     className="text-slate-400 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
  //                     onClick={() => setShowPassword(!showPassword)}
  //                     size={28}
  //                   />
  //                 )}
  //               </div>
  //             </div>
  //             <div className="flex flex-col gap-2">
  //               <p>Ulangi Password Baru</p>
  //               <div className="relative flex flex-col">
  //                 <input
  //                   type={showPasswordConfirmation ? "text" : "password"}
  //                   className="py-3 px-4 rounded-xl border-[3px] border-slate-300 outline-none focus:border-[#30628C]"
  //                 />
  //                 {!showPasswordConfirmation ? (
  //                   <Eye
  //                     className="text-slate-400 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
  //                     onClick={() =>
  //                       setShowPasswordConfirmation(!showPasswordConfirmation)
  //                     }
  //                     size={28}
  //                   />
  //                 ) : (
  //                   <EyeOff
  //                     className="text-slate-400 cursor-pointer absolute right-3 top-1/2 -translate-y-1/2"
  //                     onClick={() =>
  //                       setShowPasswordConfirmation(!showPasswordConfirmation)
  //                     }
  //                     size={28}
  //                   />
  //                 )}
  //               </div>
  //             </div>
  //             {/* UI Button Component */}
  //             {/* <Button className="bg-primary">Reset Password</Button> */}

  //             <button className="bg-[#30628C] text-white py-3 px-4 rounded-xl">
  //               Simpan
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default ForgotPasswordComponent;
