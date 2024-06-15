import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import { PiCityBold } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { FilterButton } from "@/components/ui/filterButton";

function Filter({ histories }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    histories.map((history) => {
      setCities((state) => [
        ...state,
        history.flight.departure.departureAirport.city.toLowerCase(),
        history.flight.departure.arrivalAirport.city.toLowerCase(),
      ]);
      if (history.flight.return) {
        setCities((state) => [
          ...state,
          history.flight.return.departureAirport.city.toLowerCase(),
          history.flight.return.arrivalAirport.city.toLowerCase(),
        ]);
      }
    });
  }, [histories]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FilterButton variant="outline" className="flex gap-2">
          <CiFilter className="text-lg" />
          <div>Filter</div>
        </FilterButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-semibold">
          Penerbangan
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PiCityBold className="me-2" />
            <span>Kota</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {cities.length > 0 &&
                [...new Set(cities)].map((city) => {
                  return (
                    <DropdownMenuItem key={city}>
                      <span>{city}</span>
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <FaRegCircleCheck className="me-2" />
            <span>Status</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <FaRegCircleCheck className="me-2" />
                <span>Selesai</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaRegClock className="me-2" />
                <span>Menunggu pembayaran</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GiCancel className="me-2" />
                <span>Dibatalkan</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Filter;
