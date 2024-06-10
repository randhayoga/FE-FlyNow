import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resendOtpService } from "../../services/otp";

export default function TImer({ resend, setResend, email }) {
  const [timer, setTimer] = useState(60);

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

  return (
    <>
      {resend ? (
        <button
          type="button"
          onClick={async () => {
            try {
              await resendOtpService({ email });
              toast.success(`Kode OTP berhasil dikirim ulang!`);
              setTimer(60);
              setResend(false);
            } catch (error) {
              toast.error("Gagal mengirim ulang kode OTP");
            }
          }}
        >
          Kirim ulang kode
        </button>
      ) : (
        <>{`Kirim ulang kode dalam ${timer} detik`}</>
      )}
    </>
  );
}
