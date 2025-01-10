import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/features/notification/notificationSlice';
import axios from 'axios';


const NotificationSocket = () => {
    const dispatch = useDispatch();
    let socket;
    const setupSocket = async () => {
        try {
            let socketToken = Cookies.get("socket_token");

            if (!socketToken) {
                await axios.post(
                    "http://localhost:3000/auth/SocketAuthToken",
                    {},
                    { withCredentials: true }
                );
                socketToken = Cookies.get("socket_token");
            }

            socket = io("http://localhost:5000/notification", {
                auth: { token: socketToken },
            });

            socket.on("NotificationUpdate", (data) => {
                dispatch(addNotification(data));
                console.log("Received data:", data);
            });

            socket.on("authError", (data) => {
                console.log("Auth error:", data);
                socket.disconnect();
            });
        } catch (error) {
            console.log("Socket setup error:", error);
        }
    };
    
    let sid = Cookies.get('connect.sid');
    if(sid) {
        setupSocket();
    }



  return (
    <></>
  )
}

export default NotificationSocket
