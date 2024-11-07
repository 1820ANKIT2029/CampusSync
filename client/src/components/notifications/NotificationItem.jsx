import React from "react";


const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
    // Format the timestamp
    const formattedTime = new Date(notification.timestamp).toLocaleString();
  
    return (
      <div
        className={`flex justify-between items-center p-4 my-2 rounded-lg ${notification.read ? "bg-gray-200" : "bg-yellow-100"}`}
      >
        <div>
          <p className={`font-medium ${notification.read ? "text-gray-600" : "text-gray-800"}`}>
            {notification.message}
          </p>
          <p className="text-sm text-gray-500">{formattedTime}</p>
        </div>
        <div className="flex items-center space-x-2">
          {!notification.read && (
            <button
              onClick={() => onMarkRead(notification.id)}
              className="text-sm text-blue-500 hover:underline"
            >
              Mark as Read
            </button>
          )}
          <button
            onClick={() => onDelete(notification.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  export default NotificationItem;