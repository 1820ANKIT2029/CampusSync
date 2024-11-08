import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchuserProfile } from '../../redux/features/user/userProfileSlice.js';

const EditProfile = ({isModalOpen, setIsModalOpen}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    year: 0,
    branch: '',
    email: '',
    bio: '',
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const fileSizeInMB = file.size / (1024 * 1024); 
      console.log("File size (in bytes):", file.size);
      console.log("File size (in MB):", fileSizeInMB);
  
      if (fileType !== "image") {
        setError("Only image files are allowed.");
      } else if (fileSizeInMB > 1) {
        setError("File size exceeds 1MB.");
      } else {
        setError(""); 
        setFormData((prevData) => ({
          ...prevData,
          profilePic: file,
        }));
        setPreview(URL.createObjectURL(file));
      }
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    if(error !== ''){
      return ;
    }

    const formSubmitData = new FormData();
    Object.keys(formData).forEach((key) => {
      formSubmitData.append(key, formData[key]);
    });

    console.log(formData);

    let data = {};
    if(formData.name !== ''){
       data.name = formData.name;
    }
    if(formData.year !== 0){
       data.year = formData.year;
     }
     if(formData.branch !== ''){
       data.branch = formData.branch;
     }
     if(formData.email !== ''){
       data.email = formData.email;
     }
     if(formData.bio !== ''){
       data.bio = formData.bio;
     }
     if(formData.profilePic !== null){
       data.profilePic = formData.profilePic;
     }
   try {
     const result = await axios.post('http://localhost:3000/profile/edit', data , { withCredentials: true });
     if(formData.profilePic != null) formData.profilePic = URL.createObjectURL(data.profilePic);
     dispatch(fetchuserProfile());
   } catch (err) {
     console.log({ message: 'error in updating profile' });
     console.log(err);
   }
    setFormData({
      name: '',
      year: '',
      branch: '',
      email: '',
      bio: '',
      profilePic: null,
    });
    setIsModalOpen(false); 
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
                <label className="block text-gray-700 font-bold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write a short bio"
                  rows="4" 
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

              { error && (
              <p className="text-red-700 bg-red-100 border border-red-500 rounded-md p-2 my-2">
                {error}
              </p>
            ) }


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
