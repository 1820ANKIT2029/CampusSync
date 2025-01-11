import React from 'react';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { setEventAtHome } from '../../../redux/features/HomePageSlice/eventSlice.js'

function EventCarousel({ blogs, scrollToBlogfunc }) {
  const dispatch = useDispatch();
  
  const handleClick = (index) => {
      dispatch(setEventAtHome(index));
      scrollToBlogfunc();
  };

  return (
    <div className="overflow-hidden w-full custom-scrollbar">
      <div className="relative w-full flex gap-4 py-6 overflow-x-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="h-48 aspect-video rounded-sm bg-cover bg-center hover:cursor-pointer"
          >
            <EventCard
             key={index}
             title={blog.headline} 
             creator={blog.adminId.name}
             />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCarousel;
