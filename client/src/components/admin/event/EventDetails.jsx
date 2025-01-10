import React, { useEffect, useState, useRef } from 'react';
import { fetchAdminEvent } from '../../../redux/features/adminData/adminDataSlice.js';
import Details from './Details.jsx';
import Task from '../../eventsSection/Task.jsx';
import SubmissionLayout from './SubmissionLayout.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GroupChat from '../../groupDiscussion/GroupChat.jsx';

function EventDetails() {
  const dispatch = useDispatch();
  const { eventData, eventDetailsStatus } = useSelector((state) => state.adminData);
  let { eventId } = useParams();
  const [showGroupChat, setShowGroupChat] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAdminEvent(eventId));
  }, [dispatch, eventId]);

  if (eventDetailsStatus === "pending") {
    return <p>Loading...</p>;
  }

  if (eventDetailsStatus === "failed") {
    return <p>Failed to load data</p>;
  }

  const scrollToChat = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleChat = () => {
    if(!showGroupChat){
      scrollToChat();
    }
    setShowGroupChat((prev) => !prev); // Toggle chat visibility
  };

  if (eventDetailsStatus === "succeeded" && eventData) {
    return (
      <>
      <div className="flex flex-col items-center space-y-4 max-w-6xl mx-auto p-6">
        <div className="md:flex items-stretch space-x-6 w-full bg-blue-100 h-auto">
          <div className="flex-1 m-1 bg-white rounded-lg shadow-md bg-violet-400">
            <Details event={eventData} />
          </div>
          <div className="flex-1 m-1 rounded-lg">
            <SubmissionLayout submissions={eventData.submissions} />
          </div>
        </div>

        <div className="w-full p-4 flex flex-col space-y-2">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">Tasks under this Event</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {eventData.tasks?.map((task, index) => (
              <Task key={index} title={task.name} description={task.description} />
            ))}
          </div>
        </div>
      </div>
      <div ref={chatRef}>
        {showGroupChat && <GroupChat eventId={eventId} adminId={event?.event?.organizer} />}
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {showGroupChat ? "Hide Chat" : "Show Chat"}
        </button>
      </div>
      </>
    );
  }

  return null; // Render nothing until eventData is fully loaded
}

export default EventDetails;
