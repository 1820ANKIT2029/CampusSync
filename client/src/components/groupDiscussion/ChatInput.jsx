import React, {useState} from "react";

function ChatInput({submitFunc}) {
    const [comment , setComment] = useState('');

    return (
        <div className="flex items-center w-full h-full">
            <div className="flex-grow mr-2">
                <input 
                    type="text" 
                    className="w-full h-10 border border-black rounded-md px-2" 
                    value={comment}
                    placeholder="Type your message..."
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />
            </div>
            <div className="flex-none">
                <button 
                    className="bg-blue-300 border border-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={()=> {
                        if (comment.trim()) { // Ensure the comment is not empty
                            submitFunc(comment);
                            setComment(""); // Clear the input field
                        }
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatInput;
