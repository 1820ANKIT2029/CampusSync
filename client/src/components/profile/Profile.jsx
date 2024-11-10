import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchuserProfile, updateUserProfile } from '../../redux/features/user/userProfileSlice'; 
import axios from 'axios';
import EditProfile from './EditProfile';

// name, year, branch, email, bio, profilePic

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileData = useSelector((state) => state.userProfile);
  const [localProfileData, setLocalProfileData] = useState({
    name: profileData.name,
    year: profileData.year,
    branch: profileData.branch,
    email: profileData.email,
    bio: profileData.bio,
    profilePic: profileData.profilePic,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (profileData.status === 'idle') {
      dispatch(fetchuserProfile());
    }
  }, []);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    localProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-10">
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={profileData?.profilePic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{profileData?.name}</h2>
          <p>{profileData?.year} - {profileData?.branch}</p>
          <p>{profileData?.email}</p>
          <p>{profileData?.bio}</p>
        </div>
        <button
          onClick={handleEditProfile}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 min-w-[120px]">
          <EditProfile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
      )}
    </div>
  );
};

export default Profile;
