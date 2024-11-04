import React from "react";

const AdminProfile = () => {
  return (
    <div className="flex flex-col items-center p-4">
      {/* Top Section */}
      <div className="w-full lg:flex lg:justify-center lg:items-center space-x-4 md:flex-row lg:space-x-4">
        <div className="bg-blue-300 w-1/2 h-16 lg:w-1/4" />
        <div className="bg-blue-400 w-1/2 h-16 lg:w-1/4" />
      </div>

      {/* Middle Section */}
      <div className="mt-6 w-full flex flex-col items-center space-y-2">
        <div className="bg-red-300 w-16 h-8 lg:w-24"></div>
        <div className="bg-red-500 w-24 h-8 lg:w-32"></div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 w-full grid grid-cols-1 gap-4 lg:grid-cols-2 lg:flex lg:space-x-4 lg:justify-center">
        <div className="bg-red-700 w-full h-16 lg:w-1/4"></div>
        <div className="bg-red-700 w-full h-16 lg:w-1/4"></div>
      </div>
    </div>
  );
};

export default AdminProfile;
