import { cn } from "@/lib/utils";
import useTimer from "@/hook/useTimer";

const Timer = ({isSubmitted}) => {
  const timeLeft = useTimer(15 * 60, "Waktu pemesanan habis", isSubmitted);
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div
      className={cn(
        "w-full flex justify-center items-center rounded-xl py-3 font-semibold text-base text-white",
        isSubmitted ? "bg-alert-success" : "bg-alert-danger"
      )}
    >
      {isSubmitted
        ? "Data Anda Berhasil Disimpan!"
        : `Selesaikan dalam ${formatTime(timeLeft)}`}
    </div>
  );
};

export default Timer;
