import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const EventCard = ({ event , index}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/user/event/register?eventId=${event._id}`,{}, { withCredentials: true });
      console.log("user registered in the event");
      navigate(`/event/${event._id}`)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article
      className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden relative h-72"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image */}
      <img
        className="w-full h-full object-cover"
        src={"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"}
        alt={event.name || "Event Image"}
      />

      {/* Overlay content */}
      <div className={`absolute inset-0 p-4 transition-opacity duration-300 ${isHovered ? 'bg-gray-900 bg-opacity-70' : 'bg-gray-900 bg-opacity-50'}`}>
        <h3 className="text-lg font-semibold leading-tight mb-1 text-cyan-400">
          <a href="#" className="hover:underline">{event.name || "Join Us for the Annual Tech Fest!"}</a>
        </h3>

        {/* Event Start Date */}
        <time className="block text-sm font-light text-gray-300 mb-4">
          {event.startTime ? format(new Date(event.startTime), "MMMM dd, yyyy") : "November 15, 2024"}
        </time>


          <div className="absolute inset-0 flex items-center p-4 text-center">
            <p className="text-sm text-white">
              {event.description || "Join us for a day of technology, innovation, and fun with industry leaders!"}
            </p>
          </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full text-blue-400"
            src={event.organizer?.profilePic || "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
            alt={event.organizer?.name || "Organizer"}
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {event.organizer?.name || "Tech Community"}
            </p>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Register Now
        </button>
      </div>
    </article>
  );
};

export default EventCard;
