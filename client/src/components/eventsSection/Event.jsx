import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Details from "./Details.jsx";
import TaskForm from "./TaskForm.jsx";
import Task from "./Task.jsx";
import { fetchEventInfo } from "../../redux/features/events/eventInfoSlice.js";
import GroupChat from "../groupDiscussion/GroupChat.jsx";

async function getTasks() {
  const res = await axios.get("http://localhost:3000/user/task", {
    withCredentials: true,
  });
  return res.data;
}
  
function relevantTasks(eventTasks, tasksP,submission) {
  let filteredTasks = [];
  if (!eventTasks || !tasksP) {
    return filteredTasks;
  }
  for (let i = 0; i < eventTasks.length; i++) {
    const completedTask = tasksP.find(task => eventTasks[i]._id === task.taskId._id);
    const varifiedtask = submission.find((task) => task.taskId=== eventTasks[i]._id);
    if(varifiedtask?.isCheck){
       filteredTasks.push({ ...eventTasks[i], isCompleted: (completedTask.isCompleted) ? 1 : 3 });
    }
    else if (completedTask?.isCompleted) {
      filteredTasks.push({ ...eventTasks[i], isCompleted: 2});
    } else {
      filteredTasks.push({ ...eventTasks[i], isCompleted: 3 });
    }
  }
  return filteredTasks;
}

function Event() {
  const { eventId } = useParams(); 
  const dispatch = useDispatch();
  const { event, status } = useSelector((state) => state.eventInfo);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true); 
  const [showGroupChat, setShowGroupChat] = useState(false);

  const chatRef = useRef(null);

  if (!eventId) {
    return <p>Invalid eventId...</p>;
  }
  
  useEffect(() => {
    dispatch(fetchEventInfo(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    if (!event) {
      return;
    }
    const fetchTasks = async () => {
      try {
        const taskData = await getTasks();
        console.log("iscompleted: ",taskData);
        if(taskData.length !== 0) setTasks(relevantTasks(event.task, taskData,event.submission));
        else setTasks(event.task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, [event]);

  if (status === "idle") {
    return <p>Data not available</p>;
  }

  if (status === "pending" || !eventId) {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error while fetching the data</p>;
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


  return (
    <>
      <div className="flex flex-col items-center space-y-4 max-w-6xl mx-auto p-6">
        <div className="md:flex items-stretch space-x-6 w-full bg-blue-100 h-auto">
          <div className="flex-1 m-1 bg-white rounded-lg shadow-md bg-violet-400">
            <Details event={event} />
          </div>
          <div className="flex-1 m-1 bg-white rounded-lg shadow-md bg-violet-400">
            <TaskForm event={event} tasks={tasks} setTasks={setTasks} />
          </div>
        </div>

        <div className="w-full p-4 flex flex-col space-y-2">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">
              Tasks under this Event
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {loadingTasks && <p>Loading tasks...</p>}
            {!loadingTasks && tasks.length > 0 &&
              tasks.map((task, index) => (
                <Task
                  key={index}
                  title={task.name}
                  description={task.description}
                  isCompleted={task.isCompleted}
                />
              ))}
            {!loadingTasks && tasks.length === 0 &&
              <div className="w-64 h-12 border bg-red-500 text-center flex justify-center items-center rounded-lg">
                <p>There are no tasks under this event</p>
              </div>}
          </div>
        </div>
      </div>

      <div ref={chatRef}>
        {showGroupChat && <GroupChat eventId={eventId} adminId={event.event.organizer._id} />}
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

export default Event;
