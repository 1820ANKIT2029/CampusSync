import React, { useState } from 'react';

function TaskForm() {
  const [taskName, setTaskName] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file);
    setFileName(file ? file.name : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Task Name:', taskName);
    console.log('File:', file);
  };



  return (
    <div className="max-w-xl mx-auto bg-violet-400 shadow-lg rounded-lg overflow-hidden p-6 sm:p-8">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">Task Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Name Input */}
        <div>
          <label htmlFor="taskName" className="block text-gray-700 font-medium mb-2">Task Name</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={handleTaskNameChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-violet-300 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task name"
            required
          />
        </div>

        {/* File Upload Input */}
        <div>
          {/* <label htmlFor="file" className="block text-gray-700 font-medium mb-2">Upload File</label> */}
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="hidden"
            required
          />
          <label
              htmlFor="file"
              className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Choose File
            </label>
            <span className="ml-4 text-gray-700">{fileName || ""}</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 transition duration-300 font-medium text-lg"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
