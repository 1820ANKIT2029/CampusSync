import React, { useEffect } from "react";
import NotificationItem from "./NotificationItem.jsx";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  markAsRead,
  deleteNotification,
  addNotification
} from "../../redux/features/notification/notificationSlice.js";



const NotificationSection = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);
  console.log("notifications : ", notifications);

  const markAsReadHandler = (id) => {
    dispatch(markAsRead(id));
  };

  const deleteNotificationHandler = (id) => {
    dispatch(deleteNotification(id));
  };

  useEffect(() => {
    let socket;

    const setupSocket = async () => {
      try {
        let socketToken = Cookies.get("socket_token");

        // Generate a new token if not present
        if (!socketToken) {
          await axios.post(
            "http://localhost:3000/auth/SocketAuthToken",
            {},
            { withCredentials: true }
          );
          socketToken = Cookies.get("socket_token");
        }

        // Establish the socket connection
        socket = io("http://localhost:5000/notification", {
          auth: { token: socketToken },
        });

        // Listen for notifications
        socket.on("NotificationUpdate", (data) => {
          dispatch(addNotification(data));
          console.log("Received data:", data);
        });

        // Handle authentication errors
        socket.on("authError", (data) => {
          console.error("Auth error:", data);
          socket.disconnect();
        });
      } catch (error) {
        console.error("Socket setup error:", error);
      }
    };

    const sid = Cookies.get("connect.sid");
    if (sid) {
      setupSocket();
    }

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [dispatch]); // Dispatch is a dependency

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
