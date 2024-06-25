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
import { useDispatch } from "react-redux";
import {
  searchHistoriesByCity,
  searchHistoriesByPaymentStatus,
} from "../../../../redux/actions/history";

function Filter({ histories, setLoading, setFilter }) {
  const dispatch = useDispatch();
  const [cities, setCities] = useState([]);

  const cityFiltering = async (city) => {
    setFilter(
      city
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
    setLoading(true);
    await dispatch(searchHistoriesByCity(city));
    setLoading(false);
  };

  const paymentStatusFiltering = async (paymentStatus) => {
    setFilter(
      paymentStatus
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
    setLoading(true);
    await dispatch(searchHistoriesByPaymentStatus(paymentStatus));
    setLoading(false);
  };

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
                    <DropdownMenuItem
                      key={city}
                      onClick={() => cityFiltering(city.toLowerCase())}
                    >
                      <span>
                        {city
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </span>
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
              <DropdownMenuItem onClick={() => paymentStatusFiltering("paid")}>
                <FaRegCircleCheck className="me-2" />
                <span>Selesai</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => paymentStatusFiltering("pending")}
              >
                <FaRegClock className="me-2" />
                <span>Menunggu pembayaran</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => paymentStatusFiltering("expired")}
              >
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
