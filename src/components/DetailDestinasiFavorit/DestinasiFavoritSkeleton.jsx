import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DestinasiFavoritSkeleton = () => {
  return (
    <div className="container flex flex-col md:flex-row py-7">
      <div className="w-full md:w-1/2 md:pe-10">
        <div className="relative">
          <div className="absolute top-3 right-0 flex items-center justify-end rounded-s-full py-1 px-5 bg-color-primary">
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="w-full h-80 rounded-xl object-cover" />
        </div>
      </div>
      <div className="w-full md:w-1/2 pt-4 md:pt-0">
        <div className="flex text-xl font-semibold">
          <Skeleton className="h-6 w-16" />
          <div className="mx-2">
            <Skeleton className="h-6 w-6" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="flex justify-between font-semibold items-center py-5">
          <div>
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-24 mt-1" />
          </div>
          <div className="bg-color-secondary rounded-xl py-2 px-7">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-24 mt-1 text-alert-danger" />
          </div>
        </div>
        <div className="shadow-md w-full p-5 rounded-xl">
          <Skeleton className="h-72" />
        </div>
      </div>
    </div>
  );
};

export default DestinasiFavoritSkeleton;
