import { React } from "react";
import NotFound from "./NotFound";
import Cards from "./Cards";
import LoadingCard from "./Loading";

function Body({
  loading,
  setLoading,
  notifications,
  setNotifications,
  filter,
}) {
  if (loading) {
    return <LoadingCard />;
  } else if (notifications.length === 0) {
    return <NotFound />;
  } else {
    return (
      <div>
        {[...notifications]
          .sort((a, b) => {
            if (a.isRead !== b.isRead) {
              return a.isRead ? 1 : -1;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .map((notification, index) => (
            <div key={index} style={{ opacity: notification.isRead ? 0.7 : 1 }}>
              <Cards notification={notification} filter={filter} />
              {index < notifications.length - 1 && (
                <hr className="border-t border-gray-200" />
              )}
            </div>
          ))}
      </div>
    );
  }
}

export default Body;
