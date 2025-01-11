import React from 'react';

function Task({ title, description, isCompleted }) {
  let color1 = "";
  let color2 = "";
  if(isCompleted == 1){
    color1 = "bg-green-300";
    color2 = "bg-green-350";
  }
  else if(isCompleted == 2){
    color1 = "bg-orange-200";
    color2 = "bg-orange-300";
  }
  else{
    color1 = "bg-purple-200"
    color2 = "bg-purple-300"
  }
  return (
    <div className={`flex items-center ${color1} p-4 rounded-lg w-full max-w-lg m-3 transform transition duration-300 hover:scale-105 hover:shadow-lg hover:${color2}`}>
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
