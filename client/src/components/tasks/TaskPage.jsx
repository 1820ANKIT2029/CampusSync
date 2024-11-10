import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setNewTask('');
  };

  const handleTaskSubmit = () => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    setTasks((prevTasks) => ({
      ...prevTasks,
      [formattedDate]: [...(prevTasks[formattedDate] || []), newTask],
    }));
    closePopup();
  };

  const selectedTasks = tasks[format(selectedDate, 'yyyy-MM-dd')] || [];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4">
      <div className="lg:w-1/2 p-4 lg:block hidden">
        <Calendar 
          onChange={handleDateChange} 
          value={selectedDate} 
          tileClassName={({ date, view }) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            if (view === 'month' && tasks[formattedDate]) {
              return 'highlighted-date';
            }
            return null;
          }}
          className="border rounded-lg"
        />
      </div>

      <div className="lg:w-1/2 w-full p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Tasks for {format(selectedDate, 'MMMM dd, yyyy')}</h2>
        
        {selectedTasks.length > 0 ? (
          <ul className="list-disc list-inside">
            {selectedTasks.map((task, index) => (
              <li key={index} className="text-gray-700 mb-2">{task}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks for today</p>
        )}
        
        <button 
          onClick={openPopup} 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Task
        </button>
        <button
          onClick={() => setIsCalendarPopupOpen(true)}
          className="mt-2 px-4 py-2 bg-gray-500 text-white rounded lg:hidden block hover:bg-gray-600 focus:outline-none"
        >
          Select Date
        </button>
      </div>

      {isCalendarPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
            <Calendar 
              onChange={(date) => {
                handleDateChange(date);
                setIsCalendarPopupOpen(false);
              }} 
              value={selectedDate} 
              tileClassName={({ date, view }) => {
                const formattedDate = format(date, 'yyyy-MM-dd');
                if (view === 'month' && tasks[formattedDate]) {
                  return 'highlighted-date';
                }
                return null;
              }}
              className="border rounded-lg"
            />
            <button
              onClick={() => setIsCalendarPopupOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Add Task for {format(selectedDate, 'MMMM dd, yyyy')}</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button 
                onClick={closePopup} 
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={handleTaskSubmit} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
