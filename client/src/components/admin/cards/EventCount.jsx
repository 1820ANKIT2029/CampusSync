import React from 'react';

const EventCount = ({ value }) => {
  return (
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md w-full md:w-80 md-m-4">
      <div>
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="text-gray-500">Total Events organized so far</p>
      </div>
    </div>
  );
};

export default EventCount;
