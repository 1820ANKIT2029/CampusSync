import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    headline: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3000/admin/news/create',blogData,{
        withCredentials:true,
      })
      console.log(res.data);
      alert("blog created");
    }catch(error){
      console.log(error);
    }
    setBlogData({
      headline: "",
      description: "",
      date: "",
    })
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-violet-400 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Create Blog</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-white font-medium mb-1">headline</label>
          <input
            type="text"
            name="headline"
            value={blogData.headline}
            onChange={handleChange}
            placeholder="Enter blog headline"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-violet-300 placeholder-white text-white"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={blogData.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  bg-violet-300 placeholder-white text-white"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-1">Creation Date</label>
          <input
            type="date"
            name="date"
            value={blogData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-violet-300 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 p-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
