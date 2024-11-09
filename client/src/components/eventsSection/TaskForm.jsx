import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskReg, taskSub } from '../../redux/features/events/taskSubSlice';

function TaskForm({ event, tasks }) {
  const [taskName, setTaskName] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { statusReg, statusSub } = useSelector((state) => state.taskSub);

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB >= 10) {
        setError("File size exceeds 10MB");
      } else {
        setError("");
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;

    const task = tasks.find((task) => task.name === taskName);
    const taskId = task ? task._id : null;

    if (!taskId) {
      setError("There is no such task");
      return;
    }

    try {
      const regResult = await dispatch(taskReg(taskId));
      if (regResult.type === taskReg.fulfilled.type) {
        const formData = new FormData();
        formData.append("file", file);

        const subResult = await dispatch(taskSub({ taskId, formData }));
        if (subResult.type === taskSub.fulfilled.type) {
          setError("Task submitted successfully");
        } else {
          setError("Error in task submission");
        }
      } else {
        setError("Failed to register user for the task");
      }
    } catch (err) {
      setError("Submission failed! Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-violet-400 shadow-lg rounded-lg overflow-hidden p-6 sm:p-8">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">Task Submission</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
        <div>
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 transition duration-300 font-medium text-lg"
        >
          Submit Task
        </button>
        {error && (
          <p className="text-red-700 bg-red-100 border border-red-500 rounded-md p-2 my-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
