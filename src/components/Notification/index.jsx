import React, { useState, useEffect } from "react";
import Header from "@/components/Notification/Header";
import Body from "@/components/Notification/Body";
import { getNotifications } from "../../../redux/actions/notification";
import { useDispatch, useSelector } from "react-redux";

function NotificationPage() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getNotifications("all")).then(() => {
      setLoading(false);
    });
  }, [dispatch, token]);

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  return (
    <>
      <div className="shadow-md pb-5">
        <div className="container">
          <Header
            loading={loading}
            setLoading={setLoading}
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>

      <div className="container overflow-x-hidden">
        <Body
          loading={loading}
          setLoading={setLoading}
          notifications={notifications}
          filter={filter}
        />
      </div>
    </>
  );
}

export default NotificationPage;
