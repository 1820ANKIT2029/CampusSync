import React from 'react';
import { useSelector } from 'react-redux';

function EventCarousel({events}) {
  

  const handleClick = (index) => {}
  return (
    <div className="overflow-hidden w-full custom-scrollbar">
      <div className="relative w-full flex gap-4 py-6 overflow-x-auto">

        {
          events.map((event,index)=>{
            return (
              <>
                  <div onClick={(index) => handleClick(index)} className="h-48 aspect-video rounded-sm bg-cover bg-center bg-gray-500" style={{ backgroundImage: "url('https://source.unsplash.com/random/241x361/?1')" }}></div>
              </>
            )
          })
        }
      </div>
    </div>
  );
}

export default EventCarousel;
