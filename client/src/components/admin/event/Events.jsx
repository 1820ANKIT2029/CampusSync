import React, { useState, useRef, useEffect } from "react";
import Event from "./Event.jsx";

const ResponsiveGrid = ({ events }) => {
  const [showMore, setShowMore] = useState(false);
  const gridRef = useRef(null);
  
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.maxHeight = `300px`;
    }
  }, []);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);

    if (gridRef.current) {
      if (!showMore) {
        gridRef.current.style.maxHeight = `${gridRef.current.scrollHeight}px`;
      } else {
        gridRef.current.style.maxHeight = `300px`;
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={gridRef}
        className="
          grid gap-4 
          grid-cols-1 
          sm:grid-cols-2 
          overflow-hidden 
          transition-max-height duration-500 ease-in-out
          w-full max-w-4xl
        "
      >
        {events.map((event, index) => (
          <div
            key={index}
            className="p-4 m-4 bg-blue-500 text-white rounded-lg shadow-md text-center"
            style={{ height: "100px" }}
          >
            <Event title={event.title} />
          </div>
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md"
        onClick={toggleShowMore}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ResponsiveGrid;
