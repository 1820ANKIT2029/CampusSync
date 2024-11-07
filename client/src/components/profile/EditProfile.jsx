import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    branch: '',
    email: '',
    gender: '',
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (profile picture)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePic: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formSubmitData = new FormData();
    Object.keys(formData).forEach((key) => {
      formSubmitData.append(key, formData[key]);
    });

    console.log(formData);
    // try {
    //   const response = await axios.post('http://localhost:3000/api/edit-profile', formSubmitData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    //   setMessage('Profile updated successfully!');
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    //   setMessage('An error occurred while updating the profile.');
    // }
    setFormData({
      name: '',
      year: '',
      branch: '',
      email: '',
      gender: '',
      profilePic: null,
    });
    setIsModalOpen(false); // Close modal after submitting
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600"
      >
        Edit Profile
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96 md:w-1/2 lg:w-1/3">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile Default"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>
              <label className="text-blue-500 cursor-pointer mt-2 hover:underline">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Change Profile Picture
              </label>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Year of Study</label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your year of study"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Your Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your branch"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-gray-300 text-black p-2 rounded-md font-bold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
