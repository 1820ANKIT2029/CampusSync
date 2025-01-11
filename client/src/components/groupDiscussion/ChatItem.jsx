import React from "react";
import { useSelector } from "react-redux";

function ChatItem({ comment, adminId }) {
    const {profileId} = useSelector((state) => state.userProfile);
    const id = comment.userId._id;
    let name = comment.userId.name;
    const message = comment.comment;
    const profilePic = comment.userId.profilePic;
    const time = comment.createdAt;

    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

    if(id == adminId){
        name = "Admin";
    }

    return (
        <div 
    className={`flex ${id === profileId ? "flex-row-reverse" : ""} justify-start m-4`}
>
    <div className="mx-2">
        <div className="w-10 h-10 rounded-full bg-gray-300">
            <img src={profilePic || "https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"} className="w-10 h-12 rounded-full" alt="user's image" />
        </div>
    </div>
    <div className="inline-block max-w-[50%] overflow-y-auto border border-green-800 bg-green-200 rounded-lg">
        <div className="w-full md:w-48">
            <small className="mx-2 text-gray-500">
                {id===profileId?"You":name}
            </small>
        </div>
        <div>
            <p className="mx-2 text-red-800">
                {message}
            </p>
        </div>
        <div className="w-32 md:w-full flex justify-end">
            <small className="mx-2 text-gray-500">
                {formattedTime}
            </small>
        </div>
    </div>
</div>

    );
}

export default ChatItem;
