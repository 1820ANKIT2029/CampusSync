import React from "react";

function ChatInput() {
    return (
        <div className="flex items-center w-full h-full">
            <div className="flex-grow mr-2">
                <input 
                    type="text" 
                    className="w-full h-10 border border-black rounded-md px-2" 
                    placeholder="Type your message..."
                />
            </div>
            <div className="flex-none">
                <button className="bg-blue-300 border border-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatInput;
