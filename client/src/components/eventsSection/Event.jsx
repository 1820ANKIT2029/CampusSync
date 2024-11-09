import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Details from './Details.jsx';
import TaskForm from './TaskForm.jsx';
import Task from './Task.jsx';
import { fetchEventInfo } from '../../redux/features/events/eventInfoSlice.js';

const tasks = [
  { title: "Design Homepage", description: "Create a visually appealing homepage layout for the new website." },
  { title: "API Development", description: "Develop and document the RESTful API for the application." },
  { title: "User Testing", description: "Conduct user testing sessions to gather feedback on the user interface." },
  { title: "Database Setup", description: "Set up the PostgreSQL database and configure necessary schemas." },
  { title: "SEO Optimization", description: "Optimize website content for search engines to improve visibility." },
  { title: "Marketing Strategy", description: "Develop a comprehensive marketing strategy for the product launch." },
  { title: "Feature Implementation", description: "Implement the user authentication feature with OAuth." },
  { title: "Performance Tuning", description: "Analyze and improve application performance for faster load times." },
  { title: "Accessibility Audit", description: "Perform an accessibility audit to ensure compliance with WCAG standards." }
];

function Event() {
  const eventId = useParams();
  const dispatch = useDispatch();
  const {event, status} = useSelector((state) => state.eventInfo);
  console.log("event in event.jsx"); console.log(event);

  useEffect(()=>{
    dispatch(fetchEventInfo(eventId));
  },[dispatch]);

  if(status === "idle"){
    return (<p>Data not available</p>)
  }

  if(status === "pending"){
    return (<p>Loading...</p>);
  }
  if(status === "failed"){
    return (<p>error while fetching the data</p>);
  }

  return (
    <div className="flex flex-col items-center space-y-4 max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="md:flex items-stretch space-x-6 w-full bg-blue-100 h-auto">
        <div className="flex-1 m-1 bg-white rounded-lg shadow-md bg-violet-400">
          <Details event={event} />
        </div>
        <div className="flex-1 m-1 bg-white rounded-lg shadow-md bg-violet-400">
          <TaskForm event={event} tasks={event.task} />
        </div>
      </div>

      {/* Lower Section */}
      <div className="w-full p-4 flex flex-col space-y-2">
        {/* Title for Tasks */}
        <div className='text-center'>
        <h2 className="text-4xl font-extrabold text-gray-800">Tasks under this Event</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {(event.task.length>0) && event.task.map((task, index) => (
              <Task
                  key={index}
                  title={task.name}
                  description={task.description}
              />
          ))}
          {(event?.task?.length === 0) && (
            <div className='w-64 h-12 border bg-red-500 text-center flex justfy-content item-center rounded-lg pt-2'><p>There are no tasks under this event</p></div>
          )}
      </div>

      </div>
    </div>
  );
}

export default Event;
