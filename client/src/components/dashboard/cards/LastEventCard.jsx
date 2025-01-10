import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchuserstats } from '../../../redux/features/user/userStatsSlice';

const LastEventsCard = () => {
  const {events, status} = useSelector((state) => state.userStats);
  // console.log(events);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchuserstats());
  },[dispatch])

  if(status === "pending"){
    return (<p>Loading</p>);
  }
  if(status === "failed"){
    return (<p>failed to load the data.</p>);
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-white to-indigo-100 rounded-lg shadow-lg p-6 md:min-w-3/4">
      <h2 className="text-2xl font-bold text-gray-800">Last   Events</h2>
      <div className="w-4/5 h-px bg-gray-400 my-4 mx-auto" /> 
      <ul className="mt-4 space-y-4">
        {events.length && events.map((event, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{event?.eventId?.name || "nil"}</h3>
            </div>
            <span className="text-lg font-bold text-indigo-600">{event?.points  }</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastEventsCard;
