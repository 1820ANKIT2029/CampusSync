import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const EventCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [Event, setEvent] = useState({});

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const result = await axios.get('http://localhost:3000/api/Event/');
        setEvent(result.data); // Assuming result.data is the Event object
      } catch (error) {
        console.error("Error fetching Event:", error);
      }
    };
    fetchEvent();
  }, []);

  return (
    <article
      className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden relative h-72 z-index-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <img
        className="w-full h-full object-cover transition-opacity duration-300"
        src={Event.image || "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"}
        alt={Event.title || "Event Image"}
      />

      {/* Content displayed when not hovering */}
      <div className={`absolute inset-0 p-4 flex flex-col justify-between transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'} bg-gray-900 bg-opacity-60 text-white`}>
        <h3 className="text-lg font-semibold leading-tight mb-2 text-cyan-400">
          <a href="#" className="hover:underline">{Event.title || "Join Us for the Annual Tech Fest!"}</a>
        </h3>

        <p className="text-sm mb-4 text-gray-300">
          {Event.description || "Don't miss out on the exciting workshops, talks, and networking opportunities."}
        </p>

        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full"
            src={Event.authorImage || "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt={Event.author || "Organizer"}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-teal-300">
              <a href="#" className="hover:underline">{Event.author || "Tech Community"}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Content displayed on hover */}
      <div
        className={`bg-violet-300 absolute inset-0 p-4 flex flex-col justify-between transition-opacity duration-300 bg-white ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: 10 }}
      >
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <time dateTime={Event.date || "2024-11-15"}>{Event.date || "Nov 15, 2024"}</time>
          <a href="#" className="bg-violet-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {Event.category || "Event"}
          </a>
        </div>

        <p className="text-gray-500 text-sm mb-4 text-gray-800">
          {Event.hoverDescription || "Join us for a day of technology, innovation, and fun with industry leaders!"}
        </p>

        <div className="flex items-center">
          <div className="ml-3 flex space-between">
            <NavLink to={'/events/event'}>
              <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:scale-95 transition duration-150 ease-in-out">
                Register Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
