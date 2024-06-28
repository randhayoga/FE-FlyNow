import React, { useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import { FaSearch } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { searchNotifications } from "../../../../redux/actions/notification";

function Header({
  loading,
  setLoading,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
}) {
  const dispatch = useDispatch();

  const handleSearch = () => {
    setLoading(true);
    dispatch(searchNotifications(searchTerm)).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <h1 className="text-xl font-bold my-6">
        {(filter === "all" && "Notifikasi") ||
          (filter === "unread" && "Notifikasi Belum Dibaca") ||
          (filter === "promo" && "Notifikasi Promosi") ||
          (filter === "flight" && "Notifikasi Penerbangan") ||
          (filter === "booking" && "Notifikasi Pesanan") ||
          (filter === "payment" && "Notifikasi Pembayaran")}
      </h1>
      <div className="head flex items-center gap-3 mt-4">
        <div className="page-text bg-color-primary rounded-xl p-3 grow">
          <div className="page-text-content flex items-center gap-4">
            <a href="/">
              <ArrowLeft className="text-white text-xl" />
            </a>
            <div className="text-white text-lg">Beranda</div>
          </div>
        </div>
        <Filter
          loading={loading}
          setLoading={setLoading}
          filter={filter}
          setFilter={setFilter}
        />
        <div className="search-bar flex items-center gap-2 relative">
          <input
            type="text"
            placeholder="Cari notifikasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input border border-color-primary p-2 rounded-full pl-4 pr-10 w-full text-sm"
            disabled={loading}
          />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-color-primary text-lg"
            disabled={loading}
            onClick={() => handleSearch()}
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
