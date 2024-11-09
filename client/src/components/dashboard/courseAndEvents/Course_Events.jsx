import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchuserEvents } from '../../../redux/features/user/userEventsSlice';
import EventCard from './cards/Eventcard';

// testing data
const Events = [
    { eventName: "Music Festival", creator: "Alice Johnson" },
    { eventName: "Art Exhibition", creator: "Bob Smith" },
    { eventName: "Tech Conference", creator: "Charlie Brown" },
    { eventName: "Charity Run", creator: "Dana White" },
    { eventName: "Book Fair", creator: "Eva Green" },
    { eventName: "Food Truck Festival", creator: "Frank Black" },
    { eventName: "Startup Pitch Night", creator: "Grace Lee" },
    { eventName: "Film Screening", creator: "Henry Ford" },
    { eventName: "Yoga Retreat", creator: "Isla Adams" },
    { eventName: "Gaming Tournament", creator: "Jake Roberts" },
    { eventName: "Networking Mixer", creator: "Kylie Wong" },
    { eventName: "Science Fair", creator: "Leo King" }
];

function Course_Events() {
  const {events, status} = useSelector((state) => state.userEvents);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchuserEvents());
  },[dispatch]);

  const [isEvent, setEvent] = useState(true);

  const handleCourseClick = () => {
    setEvent(false);
  };

  const handleEventClick = () => {
    setEvent(true);
  };

  if (status === "loading") {
    return <h2>Loading...</h2>;
  }

  if (status === "failed") {
    return <h2>Failed to load data.</h2>;
  }


  const colors = ["bg-red-200", "bg-green-200"];

  return (
    <section className="text-gray-600 body-font w-3/4 ">
      <div className="container px-5 py-2 mx-auto my-6 flex flex-wrap w-4/5 sm:w-full">
  <div className="flex justify-center space-x-4 flex-col sm:flex-row w-full">
    {/* Card 1 - Courses */}
    <div
      style={{ marginBottom: '12px' }}
      onClick={handleCourseClick}
      className={`md:p-2 cursor-pointer hover:shadow-indigo-500/80 transition-colors border border-indigo-500 rounded-lg shadow-md shadow-indigo-500/50 lg:w-2/5 sm:w-full ${
        !isEvent ? 'bg-violet-600' : ''
      }`}
    >
      <div className="p-4">
        <h2 className="text-gray-900 text-lg title-font font-medium text-center">Courses</h2>
      </div>
    </div>

    {/* Card 2 - Events */}
    <div
      style={{ marginBottom: '12px' }}
      onClick={handleEventClick}
      className={`md:p-2 cursor-pointer hover:shadow-indigo-500/80 transition-colors border border-indigo-500 rounded-lg shadow-md shadow-indigo-500/50 lg:w-2/5 sm:w-full ${
        isEvent ? 'bg-violet-600 ' : ''
      }`}
    >
      <div className="p-4">
        <h2 className="text-gray-900 text-lg title-font font-medium text-center">Events</h2>
      </div>
    </div>
  </div>
</div>


      {/* Displaying selected state */}
      <div className="flex flex-col items-center justify-center bg-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-3/4">
            {isEvent?events.map((event, index) => {
                    const colorClass = colors[Math.floor(index / 3) % colors.length];
                    return (
                            <EventCard key={index} eventName={event.eventId.name} start={event.createdAt} color={colorClass} />
                    );
                }):(
                  <p>There is no data for courses now</p>
                )}
            </div>
        </div>
    </section>
  );
}

export default Course_Events;
