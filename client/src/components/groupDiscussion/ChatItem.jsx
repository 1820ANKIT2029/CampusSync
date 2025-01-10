import React from "react";

function ChatItem({ id }) {
    return (
        <div 
            className={`flex ${id === 1 ? "flex-row-reverse" : ""} justify-start m-4`}
        >
            <div className="mx-2">
                <div className="w-10 h-10 rounded-full bg-gray-300">
                    <img src="https://www.shutterstock.com/image-vector/user-vector-icon-illustration-style-260nw-567409357.jpg" className="w-10 h-12 rounded-full" alt="user's image" />
                </div>
            </div>
            <div className="inline-block max-w-[50%] overflow-y-auto border border-green-800 bg-green-200 rounded-lg">
            <div className="w-full md:w-48">
                <small className="mx-2 text-gray-500">
                    Alok Negi
                </small>
            </div>
            <div>
                <p className="mx-2 text-red-800">
                    hello, my name is alok negi
                </p>
            </div>
            <div className="w-32 md:w-full flex justify-end">
                <small className="mx-2 text-gray-500">
                    7:00 PM
                </small>
            </div>
            </div>
        </div>
    );
}

export default ChatItem;
