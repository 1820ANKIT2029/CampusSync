import React from "react";

export default function Profile() {
  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar */}
      <div className="bg-red-300 w-1/6"></div>
      
      {/* Main content area */}
      <div className="flex flex-col flex-grow p-4 space-y-4">
        <div className="flex space-x-4">
          <div className="bg-lime-300 h-24 w-1/3"></div>
          <div className="bg-sky-300 h-24 w-1/3"></div>
          <div className="bg-red-300 h-24 w-1/3"></div>
        </div>
        
        <div className="flex space-x-4">
          <div className="bg-gray-200 p-4 w-1/3 space-y-2">
            <div className="bg-red-900 h-4"></div>
            <div className="bg-red-500 h-4"></div>
            <div className="bg-red-500 h-4"></div>
            <div className="bg-red-700 h-4"></div>
          </div>
          
          <div className="bg-emerald-300 h-24 w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
