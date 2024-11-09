import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './EventCard';
import { fetchEvents } from '../../redux/features/events/eventsSlice';

function EventsPage() {
  const dispatch = useDispatch();
  const { events, status } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (status === "failed") {
    return <h2>Failed to load data.</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event,index) => (
          <EventCard key={index} index={index} event={event} /> // Pass event as a prop
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
