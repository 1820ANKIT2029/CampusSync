import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchuserProfile, updateUserProfile } from '../../redux/features/user/userProfileSlice'; 
import axios from 'axios';

// name, year, branch, email, gender, profilePic

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localProfileData, setLocalProfileData] = useState({
    name: '',
    year: '',
    branch: '',
    email: '',
    gender: 'male',
    profilePic: 'https://via.placeholder.com/150',
  });

  const profileData = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileData.status === 'idle') {
      dispatch(fetchuserProfile());
    }
  }, [dispatch, profileData.status]);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = async () => {
     console.log("entered");
    try {
      const result = await axios.post('http://localhost:3000/profile/edit', localProfileData, { withCredentials: true });
      console.log(result);
      dispatch(updateUserProfile(localProfileData));
    } catch (err) {
      console.log({ message: 'error in updating profile' });
      console.log(err);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <p>{profileData?.gender}</p>
        </div>
        <button
          onClick={handleEditProfile}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                value={localProfileData.name}
                placeholder="your name here"
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Year of Study</label>
              <input
                type="text"
                name="year"
                value={localProfileData.year}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={localProfileData.branch}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={localProfileData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gender</label>
              <select
                name="gender"
                value={localProfileData.gender}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-300 text-black p-2 rounded-md font-bold hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
