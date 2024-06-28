import React from "react";
import gambar_history_kosong from "@/assets/images/gambar_history_kosong.png";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center flex-col h-full mt-32 justify-center">
      <img src={gambar_history_kosong} alt="history not found" />
      <div className="mt-4 text-color-primary text-lg">Notifikasi kosong</div>
    </div>
  );
}

export default NotFound;
