import useTimer from "./useTimer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbWithTimer = () => {
  const timeLeft = useTimer(15 * 60);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full tracking-wide mb-6 bg-white">
      <Breadcrumb className="mb-2">
        <BreadcrumbList className="text-base cursor-default">
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">Isi Data Diri</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-muted-foreground">Bayar</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-muted-foreground">Selesai</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full flex justify-center items-center rounded-xl py-3 font-semibold text-base bg-red-600 text-white">
        Selesaikan dalam {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default BreadcrumbWithTimer;
