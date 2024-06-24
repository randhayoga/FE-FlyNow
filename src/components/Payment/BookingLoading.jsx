import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const BookingLoading = () => {
  return (
    <div>
      {/* Departure */}
      <div className="flex w-full justify-between mt-5">
        <Skeleton className="w-[75px] h-6 mb-2" />
        <Skeleton className="w-[150px] h-6 mb-2" />
      </div>
      <Skeleton className="w-1/2 h-4 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-2" />

      <Separator className="my-4" />

      {/* Airline Info */}
      <div className="flex w-full items-center gap-2">
        <Skeleton className="w-6 h-6" />
        <div className="flex-grow">
          <Skeleton className="w-3/4 h-4 mb-2" />
          <Skeleton className="w-1/2 h-4 mb-2" />

          <Skeleton className="w-1/2 h-4 mb-2" />
          <Skeleton className="w-1/2 h-32 mb-2" />
        </div>
      </div>

      <Separator className="my-4" />

      {/* Arrival */}
      <div className="flex w-full justify-between">
        <Skeleton className="w-[75px] h-6 mb-2" />
        <Skeleton className="w-[150px] h-6 mb-2" />
      </div>
      <Skeleton className="w-1/2 h-4 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-2" />

      <Separator className="my-4" />

      {/* Price */}
      <Skeleton className="w-1/2 h-6 mb-2" />
      <div className="flex w-full justify-between items-center mb-2">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex w-full justify-between items-center mb-2">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex w-full justify-between items-center mb-2">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex w-full justify-between items-center mb-2">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>

      <Separator className="my-4" />

      {/* Total Price */}
      <div className="flex w-full justify-between items-center">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-1/2 h-6" />
      </div>
    </div>
  );
};

export default BookingLoading;
