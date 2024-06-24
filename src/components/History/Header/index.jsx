import React, { useState } from "react";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { searchHistories } from "../../../../redux/actions/history";
import { IoIosClose } from "react-icons/io";
import { ArrowLeft } from "lucide-react";

function Header({ setLoading }) {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.histories);
  const [filter, setFilter] = useState("");

  const fetchHistories = async () => {
    setFilter("");
    setLoading(true);
    await dispatch(searchHistories());
    setLoading(false);
  };

  return (
    <>
      <h1 className="font-semibold text-xl mt-10">Riwayat Pemesanan</h1>
      <div className="head flex items-center gap-3 mt-4">
        <div className="page-text bg-color-primary rounded-lg p-3 grow">
          <div className="page-text-content flex items-center gap-4">
            <a href="/">
              <ArrowLeft className="text-white text-xl" />
            </a>
            <div className="text-white text-lg">Beranda</div>
          </div>
        </div>
        <Filter
          setFilter={setFilter}
          setLoading={setLoading}
          histories={histories}
        />
      </div>
      {filter.length > 0 && (
        <div className="filter-badge mt-4 outline rounded-sm outline-1 w-fit flex outline-color-primary text-color-primary">
          <div className="text-sm lg:text-base h-full ps-2 px-2">{filter}</div>
          <div
            onClick={() => fetchHistories()}
            className="flex justify-center w-fit items-center border-l border-l-color-primary cursor-pointer hover:bg-gray-200 text-lg"
          >
            <IoIosClose />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
