import React from 'react';

function Task({ title, description }) {
  return (
    <div className="flex items-center bg-purple-200 p-4 rounded-lg w-full max-w-lg m-3 transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-300">
      {/* Inner Box (Red Background) */}
      <div className="flex flex-col space-y-2 p-4 rounded-md">
        {/* Green Bars */}
        <div className="h-auto rounded text-lg font-semibold">{title}</div>
        <div className="h-auto rounded text-sm text-think">
          {description}
        </div>
      </div>
    </div>
  );
}

export default Task;
