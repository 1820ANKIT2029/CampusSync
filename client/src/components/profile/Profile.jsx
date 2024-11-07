import React, { useState } from 'react';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    year: '2nd Year',
    branch: 'Computer Science',
    email: 'johndoe@example.com',
    gender: 'Male',
    profilePic: 'https://via.placeholder.com/150', // You can replace this with actual profile pic URL
  });

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg mt-10">

      {/* Profile Dashboard Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 mb-4">
          <img
            src={profileData.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{profileData.name}</h2>
          <p>{profileData.year} - {profileData.branch}</p>
          <p>{profileData.email}</p>
          <p>{profileData.gender}</p>
        </div>
        <button
          onClick={handleEditProfile}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal for Editing Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Your Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Year of Study</label>
              <input
                type="text"
                value={profileData.year}
                onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Branch</label>
              <input
                type="text"
                value={profileData.branch}
                onChange={(e) => setProfileData({ ...profileData, branch: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Gender</label>
              <select
                value={profileData.gender}
                onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="w-full bg-gray-300 text-black p-2 rounded-md font-bold hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save changes here, if necessary
                  handleCloseModal();
                }}
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
