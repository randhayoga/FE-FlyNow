import logoUrl from '@/assets/images/FlyNow-logo.svg';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';


export async function loader() {
  // TODO: Before this page is loaded, we need to send OTP to the user's email.

}

export async function action() {
  // TODO: After the user submits the OTP, we need to verify the OTP.
}

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time OTP must be 6 characters.',
  }),
});

/**
 // TODO: Implement the following:
 * - Implement correct OTP submission logic and Show a toast message ("Registrasi berhasil").
 * - Implement wrong OTP submission logic and show a toast message ("Maaf, kode OTP salah!").
 * - Implement the resend OTP logic and Show a toast message when the user clicks the resend OTP button.
 * - Replace the email placeholder with the actual email from the previous page.
 * - Redirect the user to the previous page if they click the back button.
 */
const OtpPage = () => {
  // TODO: Replace with actual email from the previous page.
  const email = '';
  const { toast } = useToast();
  const [timer, setTimer] = useState(2);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setResend(true);
    }
  }, [timer]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  function onSubmit(data) {
    // TODO: Handle OTP submission logic.
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <nav className="navbar mb-12 shadow-sm py-4 px-4 md:px-36">
        <img src={logoUrl} alt="FlyNow Logo" className="w-20" />
      </nav>
      <main className="max-w-screen-sm mx-auto flex items-center flex-col px-4">
        <div className="w-full flex mb-6">
          {/* TODO: Belum tahu harus balik kemana */}
          <Link to="/login" className="text-primary">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="flex-grow text-center text-2xl font-bold">
            Masukkan OTP
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
            <FormField
              control={form.control}
              name="otp"
              className="flex gap-4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block font-normal text-center mb-11">
                    Ketik 6 digit kode yang dikirimkan ke{' '}
                    <span className="font-bold">
                      {email || 'J*****@gmail.com'}
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
                    {resend ? (
                      <button
                        type="button"
                        onClick={() => {
                          // TODO: Handle resend OTP Logic.
                          setTimer(60);
                          setResend(false);
                        }}
                      >
                        Kirim ulang kode
                      </button>
                    ) : (
                      `Kirim ulang kode dalam ${timer} detik`
                    )}
                  </FormDescription>
                  <FormMessage className="block text-center" />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Simpan
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default OtpPage;
