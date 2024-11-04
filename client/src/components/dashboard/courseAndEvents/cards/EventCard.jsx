// EventCard.jsx
import React from 'react';

const EventCard = ({ eventName, creator, color }) => {
    return (
        <div className={`border border-gray-300 rounded-lg shadow-md p-4 transition-colors ${color}`}>
            <div className="flex items-center flex-wrap">
                <div className=''>
                <h3 className="text-lg font-bold mr-2" >{eventName}</h3>
                </div>
                <div>
                <p className="text-gray-700 text-xs">Created by: {creator}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
