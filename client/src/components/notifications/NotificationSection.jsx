import React, { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem.jsx";
import Cookies from 'js-cookie';
import  {io } from 'socket.io-client';
import axios from 'axios';

const notificationsData = [
  { id: 1, message: "You have a new message from Arib!", read: false, timestamp: "2024-08-01T10:15:00" },
  { id: 2, message: "Your profile has been updated successfully.", read: false, timestamp: "2024-08-02T12:30:00" },
  { id: 3, message: "Dylan commented on your post.", read: true, timestamp: "2024-08-03T09:45:00" },
  { id: 4, message: "New event: Coding Contest is starting soon!", read: false, timestamp: "2024-08-04T14:20:00" },
];


let socket;

const NotificationSection = () => {
  const [notifications, setNotifications] = useState(notificationsData);

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
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
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
