// EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ eventName, eventId ,color }) => {
    return (
        <Link to={`/event/${eventId}`}>
        <div className={`border border-gray-300 rounded-lg shadow-md p-4 transition-colors ${color}`}>
            <div className="flex items-center flex-wrap">
                <div className='w-full'>
                <h3 className="text-lg font-bold mr-2" >{eventName}</h3>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default EventCard;
