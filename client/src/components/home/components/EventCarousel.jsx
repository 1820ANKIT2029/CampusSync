import React from 'react';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { setEventAtHome } from '../../../redux/features/HomePageSlice/eventSlice.js'

function EventCarousel({ events }) {
  const it = useSelector((state) => state.event.event)
  const dispatch = useDispatch();
  
  const handleClick = (index) => {
      dispatch(setEventAtHome(index));
  };

  return (
    <div className="overflow-hidden w-full custom-scrollbar">
      <div className="relative w-full flex gap-4 py-6 overflow-x-auto">
        {events.map((event, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="h-48 aspect-video rounded-sm bg-cover bg-center "
          >
            <EventCard
             key={index}
             title={event.title} 
             creator={event.creator} 
             />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventCarousel;
