import React, { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem.jsx";
import Cookies from 'js-cookie';
import  {io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

// const notificationsData = [
//   { _id: 1, message: "No Notification till now!", read: false, timestamp: "" },
// ];


let socket;

const NotificationSection = () => {
  const dispatch = useDispatch();
  const notificationData = useSelector((state) => state.notifications);
  const [notifications, setNotifications] = useState(notificationData);

  useEffect(() => {
    // Async function to handle socket setup
    const setupSocket = async () => {
      try {
        let socketToken = Cookies.get('socket_token');

        // Request token if not available
        if (!socketToken) {
          await axios.post("http://localhost:3000/auth/SocketAuthToken", {}, { withCredentials: true });
          socketToken = Cookies.get('socket_token');
        }

        // Initialize socket connection
        socket = io("http://localhost:5000/notification", {
          auth: { token: socketToken }
        });

        // Listen for notifications and authentication errors
        socket.on("NotificationUpdate", (data) => {
          data = {...data,...notifications};
          dispatch(setNotifications(data));
          console.log("Received data:", data);
          setNotifications(data);
        });

        socket.on("authError", (data) => {
          console.log("Auth error:", data);
          socket.disconnect();
        });
      } catch (error) {
        console.log("Socket setup error:", error);
      }
    };

    // Call the async function
    setupSocket();

    // Cleanup socket on component unmount
    return () => {
      if (socket) {
        socket.off("NotificationUpdate");
        socket.off("authError");
        socket.disconnect();
      }
    };
  }, []);
  

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification._id !== id)
    );
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
              onMarkRead={markAsRead}
              onDelete={deleteNotification}
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
