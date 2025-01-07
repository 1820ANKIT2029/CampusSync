import React from "react";


const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
    let formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    let formattedTime = formatter.format(notification.createdAt);
    const empty = notification.message === "No Notification till now!";
    if(empty){
      formattedTime = "";
    }
  
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
          {!notification.read && !empty && (
            <button
              onClick={() => onMarkRead(notification._id)}
              className="text-sm text-blue-500 hover:underline"
            >
              Mark as Read
            </button>
          )}

          {!empty && (
            <button
              onClick={() => onDelete(notification._id)}
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