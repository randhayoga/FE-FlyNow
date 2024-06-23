import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import BookingDetail from "./BookingDetail";
import { CgArrowsV } from "react-icons/cg";
const CollapsibleBooking = ({
  isOpen,
  setIsOpen,
  title,
  booking,
  flight,
  isLoading,
}) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-5 mt-4 border-2 px-4 py-2 rounded-md"
    >
      <CollapsibleTrigger>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold tracking-wide text-base text-color-primary">
            {title}
          </h1>
          <CgArrowsV className="text-lg text-gray-400" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <BookingDetail
          booking={booking}
          flight={flight}
          isLoading={isLoading}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleBooking;
