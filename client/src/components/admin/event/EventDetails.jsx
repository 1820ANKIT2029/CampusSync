import React from 'react';
import Details from '../../eventsSection/Details.jsx';
import Task from '../../eventsSection/Task.jsx';
import SubmissionLayout from './SubmissionLayout.jsx';

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

function EventDetails() {
  return (
    <div className="flex flex-col items-center space-y-4 max-w-6xl mx-auto p-6">
      <div className="md:flex items-stretch space-x-6 w-full bg-blue-100 h-auto">
        <div className="flex-1 m-1 bg-white rounded-lg shadow-md bg-violet-400">
          <Details />
        </div>
        <div className="flex-1 m-1 rounded-lg">
          <SubmissionLayout/>
        </div>
      </div>

      {/* Lower Section */}
      <div className="w-full p-4 flex flex-col space-y-2">
        {/* Title for Tasks */}
        <div className='text-center'>
        <h2 className="text-4xl font-extrabold text-gray-800">Tasks under this Event</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {tasks.map((task, index) => (
              <Task
                  key={index}
                  title={task.title}
                  description={task.description}
              />
          ))}
      </div>

      </div>
    </div>
  );
}

export default EventDetails;
