import React, { useState } from "react";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    creationDate: "",
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the blog data
    console.log(blogData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-violet-400 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Create Blog</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-white font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
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
            name="creationDate"
            value={blogData.creationDate}
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
