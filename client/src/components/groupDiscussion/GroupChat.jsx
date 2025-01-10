import React from "react";
import ChatItem from "./ChatItem";
import ChatInput from "./ChatInput";

function GroupChat() {
    return (
        <div className="grid place-items-center h-auto">
            <div className="w-2/3 md:min-h-96 md:max-h-screen bg-pink-200 p-4 overflow-y-auto border border-pink-500 rounded-md mb-2">
                <ChatItem key={1} id={2} />
                <ChatItem key={2} id={1} />
                <ChatItem key={3} id={2} />
                <ChatItem key={4} id={1} />
            </div>
            <div className="w-2/3 h-12">
                <ChatInput />
            </div>
        </div>
    );
}

export default GroupChat;
