import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

const SelectSort = ({ handleSortChange }) => {
  return (
    <div className="flex justify-end mt-6 mb-2">
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="px-4 w-auto rounded-full border-2 border-color-primary text-color-primary font-bold">
          <ArrowUpDown className="me-2"></ArrowUpDown>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="price-asc">Harga - Termurah</SelectItem>
            <SelectItem value="price-desc">Harga - Termahal</SelectItem>
            <SelectItem value="duration-asc">Durasi - Terpendek</SelectItem>
            <SelectItem value="duration-desc">Durasi - Terpanjang</SelectItem>
            <SelectItem value="departure-asc">
              Keberangkatan - Paling Awal
            </SelectItem>
            <SelectItem value="departure-desc">
              Keberangkatan - Paling Akhir
            </SelectItem>
            <SelectItem value="arrival-asc">
              Kedatangan - Paling Awal
            </SelectItem>
            <SelectItem value="arrival-desc">
              Kedatangan - Paling Akhir
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSort;
