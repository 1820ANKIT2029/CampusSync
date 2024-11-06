import React, {useState} from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const submissions = [
    { username: 'Username1', task: 'Task Name', submissionId: 1 },
    { username: 'Username2', task: 'Task Name', submissionId: 2 },
    { username: 'Username3', task: 'Task Name', submissionId: 3 },
    { username: 'Username4', task: 'Task Name', submissionId: 4 },
  ];

  const docs = [
    { uri: "https://res.cloudinary.com/dwlputtun/image/upload/v1730522067/ysuvwnriqlpqtdlyqysk.png" },
  ];

const SubmissionLayout = () => {
    const [isOpen, setisOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState('');
    const [tasksub,setTasksub] = useState(submissions);

    const verifySubmission = (submissionId) => {
        const userSubmission = tasksub.find((sub) => sub.submissionId === submissionId);
        console.log(userSubmission);
        console.log("submission accepted");
        
        setTasksub((prevTasksub) => prevTasksub.filter((sub) => sub.submissionId !== submissionId));
    };

    const rejectSubmission = (submissionId) => {
        const userSubmission = tasksub.find((sub) => sub.submissionId === submissionId);
        console.log(userSubmission);
        console.log("submission rejected")
        
        setTasksub((prevTasksub) => prevTasksub.filter((sub) => sub.submissionId !== submissionId));
    };
    

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto hide-scrollbar">
      <div className="text-center text-xl font-bold text-gray-800 p-4 border-b border-gray-200">
        Submissions
      </div>


      {tasksub.map((submission) => (
        <div
          key={submission.submissionId}
          className="flex items-center bg-pink-100 px-4 py-2 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        >
          {/* User and Task Info */}
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{submission.username}</div>
            <div className="text-gray-600 text-sm">{submission.task}</div>
          </div>

          <div className="flex gap-2">
            <Link to={docs[0].uri} target='_blank'>
            <div
              className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200"
              title="View"
            >
              <FaEye />
            </div>
            </Link>
            <div
              onClick={() => verifySubmission(submission.submissionId)}
              className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 transition duration-200"
              title="Accept"
            >
              <FaCheck />
            </div>
            <div
              onClick={() => rejectSubmission(submission.submissionId)}
              className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition duration-200"
              title="Reject"
            >
              <FaTimes />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubmissionLayout;
