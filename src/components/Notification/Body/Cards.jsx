import React from "react";
import axios from "axios";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  markAsRead,
  getNotifications,
  deleteNotification,
  getIsUnread,
} from "../../../../redux/actions/notification";

const NotificationCard = ({ notification, filter }) => {
  const dispatch = useDispatch();

  const isRead = notification.isRead;
  const createdAt = new Date(notification.createdAt);
  const day = createdAt.getDate();
  const hour = createdAt.getHours().toString().padStart(2, "0");
  const minute = createdAt.getMinutes().toString().padStart(2, "0");
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = months[createdAt.getMonth()];

  const handleMarkAsRead = async (id) => {
    await dispatch(markAsRead(id));
    await dispatch(getNotifications(filter));
    await dispatch(getIsUnread());
  };

  const handleDelete = async (id) => {
    await dispatch(deleteNotification(id));
    await dispatch(getNotifications(filter));
    await dispatch(getIsUnread());
  };

  return (
    <div className="card-container flex flex-col gap-2 my-2 p-4 rounded-lg">
      {/* First Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IoNotificationsCircleSharp
            className={`text-2xl ${
              isRead ? "text-green-500" : "text-red-500 "
            }`}
          />
          <span className="text-lg font-medium">
            {(notification.type === "promo" && "Promosi") ||
              (notification.type === "flight" && "Penerbangan") ||
              (notification.type === "booking" && "Pesanan") ||
              (notification.type === "payment" && "Pembayaran")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="opacity-80">
            {day} {month}, {hour}:{minute}
          </span>
        </div>
      </div>
      {/* Second Row */}
      <div className="flex justify-between items-center mt-0">
        <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          {notification.message}
        </div>
        <div className="flex items-center gap-5">
          <button
            className="text-lg text-gray-500 hover:text-green-700"
            style={{ opacity: notification.isRead ? 0 : 1 }}
            onClick={() => handleMarkAsRead(notification.id)}
            disabled={notification.isRead}
          >
            <FaCheck />
          </button>

          <button
            className="text-lg text-gray-500 hover:text-red-600"
            onClick={() => handleDelete(notification.id)}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
