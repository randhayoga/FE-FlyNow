import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { PiCityBold } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { FilterButton } from "@/components/ui/filterButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

function HistoryPage() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <div className="mx-2 sm:mx-20 md:mx-40">
      <h1 className="font-semibold text-xl mt-10">Riwayat Pemesanan</h1>
      <div className="head mt-5 flex items-center gap-3 sm:mx-3 md:mx-3">
        <div className="page-text bg-primary rounded-lg p-3 grow">
          <div className="page-text-content flex items-center gap-4">
            <GoArrowLeft className="dark:text-black text-xl" />
            <div className="dark:text-black text-lg">Beranda</div>
          </div>
        </div>
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
                  <DropdownMenuItem>
                    <span>Jakarta</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Melbourne</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Shanghai</span>
                  </DropdownMenuItem>
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
      </div>
    </div>
  );
}

export default HistoryPage;
