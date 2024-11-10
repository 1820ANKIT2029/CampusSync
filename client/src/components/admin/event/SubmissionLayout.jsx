import React, {useState} from 'react';
import { verifySub, rejectSub } from '../../../redux/features/adminData/adminDataSlice';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SubmissionLayout = ({submissions}) => {
    const {verifyStatus, rejectionStatus, eventDetailsStatus} = useSelector((state) => state.adminData);
    const [isOpen, setisOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState('');
    const [tasksub,setTasksub] = useState(submissions);
    const dispatch = useDispatch();

    const verifySubmission = async (submissionId) => {
        await dispatch(verifySub(submissionId));
        
        if(verifyStatus === "succeeded"){
          setTasksub((prevTasksub) => prevTasksub.filter((sub) => sub.submissionId !== submissionId));
        }
        else{
          console.log("failed to pass the submission");
        }
    };

    const rejectSubmission = async (submissionId) => {
        await dispatch(rejectSub(submissionId));
        if(rejectionStatus === "succeeded"){
          setTasksub((prevTasksub) => prevTasksub.filter((sub) => sub.submissionId !== submissionId));
        }
        else{
          console.log("failed to reject the submission")
        }
    };

    if(eventDetailsStatus === "pending"){
      return (<p>loading...</p>);
    }
    if(eventDetailsStatus === "failed"){
      return (<p>failed to load data</p>);
    }

    if(submissions.length === 0){
      return (
        <>
        <div>No submissions</div>
        </>
      )
    }
    

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto hide-scrollbar">
      <div className="text-center text-xl font-bold text-gray-800 p-4 border-b border-gray-200">
        Submissions
      </div>


      {tasksub.map((submission,index) => (
        <div
          key={index}
          className="flex items-center bg-pink-100 px-4 py-2 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        >
          {/* User and Task Info */}
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{submission.participantId.name}</div>
            <div className="text-gray-600 text-sm">{submission.taskId.name}</div>
          </div>

          <div className="flex gap-2">
            <Link to={submission.fileId.url} target='_blank'>
            <div
              className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition duration-200"
              title="View"
            >
              <FaEye />
            </div>
            </Link>
            <div
              onClick={() => verifySubmission(submission._id)}
              className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 transition duration-200"
              title="Accept"
            >
              <FaCheck />
            </div>
            <div
              onClick={() => rejectSubmission(submission._id)}
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
