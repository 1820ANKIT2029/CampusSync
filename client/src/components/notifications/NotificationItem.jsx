import React from "react";

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  let formattedTime = "";
  if (notification[0].createdAt) {
    try {
      let formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      formattedTime = formatter.format(new Date(notification[0].createdAt));
    } catch (error) {
      console.error("Invalid date:", notification[0].createdAt);
    }
  }

  const empty = notification[0].message === "No Notification till now!";

  return (
    <div
      className={`flex justify-between items-center p-4 my-2 rounded-lg ${notification[0].read ? "bg-gray-200" : "bg-yellow-100"}`}
    >
      <div>
        <p className={`font-medium ${notification[0].read ? "text-gray-600" : "text-gray-800"}`}>
          {notification[0].message}
        </p>
        <p className="text-sm text-gray-500">{formattedTime}</p>
      </div>
      <div className="flex items-center space-x-2">
        {!notification[0].read && !empty && (
          <button
            onClick={() => onMarkRead(notification[0]._id)}
            className="text-sm text-blue-500 hover:underline"
          >
            Mark as Read
          </button>
        )}
        {!empty && (
          <button
            onClick={() => onDelete(notification[0]._id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
