import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaMoneyBillWave, FaPlane, FaShoppingCart } from "react-icons/fa";
import { IoIosNotifications, IoIosMailUnread } from "react-icons/io";
import { RiDiscountPercentFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { FilterButton } from "@/components/ui/filterButton";

import { getNotifications } from "../../../../redux/actions/notification";
import { useDispatch } from "react-redux";

function Filter({ loading, setLoading, filter, setFilter }) {
  const dispatch = useDispatch();

  return (
    <DropdownMenu className="focus:outline-none">
      <DropdownMenuTrigger asChild>
        <FilterButton
          variant="outline"
          className="flex gap-2"
          disabled={loading}
        >
          <CiFilter className="text-lg" />
          <div>Filter</div>
        </FilterButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          onSelect={() => {
            setLoading(true);
            setFilter("all");
            dispatch(getNotifications("all")).then(() => {
              setLoading(false);
            });
          }}
        >
          <IoIosNotifications className="mr-2" />
          Semua
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setLoading(true);
            setFilter("unread");
            dispatch(getNotifications("unread")).then(() => {
              setLoading(false);
            });
          }}
        >
          <IoIosMailUnread className="mr-2" />
          Belum Dibaca
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setLoading(true);
            setFilter("promo");
            dispatch(getNotifications("promo")).then(() => {
              setLoading(false);
            });
          }}
        >
          <RiDiscountPercentFill className="mr-2" />
          Promosi
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setLoading(true);
            setFilter("flight");
            dispatch(getNotifications("flight")).then(() => {
              setLoading(false);
            });
          }}
        >
          <FaPlane className="mr-2" />
          Penerbangan
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setLoading(true);
            setFilter("booking");
            dispatch(getNotifications("booking")).then(() => {
              setLoading(false);
            });
          }}
        >
          <FaShoppingCart className="mr-2" />
          Pesanan
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setLoading(true);
            setFilter("payment");
            dispatch(getNotifications("payment")).then(() => {
              setLoading(false);
            });
          }}
        >
          <FaMoneyBillWave className="mr-2" />
          Pembayaran
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Filter;
