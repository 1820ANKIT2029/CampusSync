import React, { useState } from "react";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    tasks: []
  });

  const [currentTask, setCurrentTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    submissionType: "pdf"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const addTask = () => {
    setFormData((prevData) => ({
      ...prevData,
      tasks: [...prevData.tasks, currentTask]
    }));
    setCurrentTask({ name: "", description: "", dueDate: "", submissionType: "pdf" });
  };

  const removeTask = (index) => {
    const updatedTasks = formData.tasks.filter((task, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      tasks: updatedTasks
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Data:", formData);
    setFormData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      tasks: []
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-violet-400 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
        
        {/* Event Details */}
        <div className="lg:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Event Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 placeholder-white text-white"
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 placeholder-white text-white"
              placeholder="Enter event description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-white"
              required
            />
          </div>
        </div>

        {/* Task Creation */}
        <div className="lg:w-1/2">
          <h3 className="text-xl font-semibold mb-4">Add Task</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="taskName">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="name"
              value={currentTask.name}
              onChange={handleTaskChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 placeholder-white text-white"
              placeholder="Enter task name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="taskDescription">
              Description
            </label>
            <textarea
              id="taskDescription"
              name="description"
              value={currentTask.description}
              onChange={handleTaskChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 placeholder-white text-white"
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="dueDate">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={currentTask.dueDate}
              onChange={handleTaskChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="submissionType">
              Submission Type
            </label>
            <select
              id="submissionType"
              name="submissionType"
              value={currentTask.submissionType}
              onChange={handleTaskChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-violet-300 text-white"
              required
            >
              <option value="pdf">PDF</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <button
            type="button"
            onClick={addTask}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Task Queue */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tasks Queue</h3>
        {formData.tasks.length > 0 ? (
          formData.tasks.map((task, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center mb-2">
                <h4 className="font-semibold">Task {index + 1}: {task.name}</h4>
                <button
                  type="button"
                  onClick={() => removeTask(index)}
                  className="ml-auto px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              <p className="text-gray-700">Description: {task.description}</p>
              <p className="text-gray-700">Due Date: {task.dueDate}</p>
              <p className="text-gray-700">Submission Type: {task.submissionType}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No tasks added yet.</p>
        )}
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Create Event
      </button>
    </div>
  );
};

export default CreateEvent;
