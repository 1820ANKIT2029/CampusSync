import React, { useEffect } from "react";
import NotificationItem from "./NotificationItem.jsx";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  markAsRead,
  deleteNotification,
} from "../../redux/features/notification/notificationSlice.js";



const NotificationSection = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);
  console.log("notifications : ",notifications);

  const markAsReadHandler = (id) => {
    dispatch(markAsRead(id));
  };

  const deleteNotificationHandler = (id) => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div>
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkRead={markAsReadHandler}
              onDelete={deleteNotificationHandler}
            />
          ))
        ) : (
          <p className="text-gray-500">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationSection;
