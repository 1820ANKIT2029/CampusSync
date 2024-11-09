import React from 'react';
import { format } from 'date-fns';

function Details({event}) {
  console.log("helooooooooooo");
  console.log(event);
  return (
    <div className="max-w-auto h-full mx-auto rounded-lg bg-violet-400" style={{margin:0}}>

      <div className="p-6">
        <h2 className="text-3xl font-semibold text-white m-4">{event.event.name.trim().toUpperCase()}</h2>

        <div className="flex items-center mt-2 text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10m-6 4h6m-9 4h9a2 2 0 002-2V7a2 2 0 00-2-2h-1"></path>
          </svg>
          <span className='text-gray-700 text-sm'>{(event.event?.startTime) && (
            <span> {format(new Date(event.event.startTime), "MMMM dd, yyyy")}</span>
            )}</span>
        </div>

        {/* Location */}
        <div  className="flex items-center mt-2 text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.221 19.227c1.528-2.773 5.003-6.6 6.779-8.227 1.776 1.627 5.251 5.454 6.779 8.227M12 21c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
          </svg>
          <span className='text-gray-700 text-sm'>{event.event.location}</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 px-2 text-base">{event.event?.description}</p>

        
      </div>
    </div>
  );
}

export default Details;
