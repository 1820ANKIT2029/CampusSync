import React from 'react';

function Event({ title }) {
  return (
    <div className="w-full max-w-sm h-24 rounded-lg shadow-xl overflow-hidden border border-blue-300 bg-gradient-to-br from-blue-50 to-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-blue-700">{title}</h2>
      </div>
    </div>
  );
}

export default Event;
