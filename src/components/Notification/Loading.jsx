import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingComponent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      <div className="col-span-2 rounded-lg">
        <div className="w-full mb-6">
          <Skeleton className="w-full h-[140px]" />
          <Skeleton className="w-3/4 rounded-lg h-[30px] mt-2" />
        </div>
        <div className="w-full mb-6">
          <Skeleton className="w-full h-[140px] " />
          <Skeleton className="w-3/4 rounded-lg h-[30px] mt-2" />
        </div>
      </div>
    </div>
  );
}

export default LoadingComponent;
