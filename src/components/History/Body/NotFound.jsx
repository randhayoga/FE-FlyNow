import React from "react";
import gambar_history_kosong from "@/assets/images/gambar_history_kosong.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center flex-col h-full mt-20 justify-center">
      <img src={gambar_history_kosong} alt="history not found" />
      <div className="mt-4 text-color-primary text-lg">
        Oops! Riwayat pesanan kosong!
      </div>
      <div className="text-black">
        Anda belum melakukan pemesanan penerbangan
      </div>
      <Button
        size="lg"
        variant="primary"
        className="mt-4"
        onClick={() => navigate("/")}
      >
        Cari Penerbangan
      </Button>
    </div>
  );
}

export default NotFound;
