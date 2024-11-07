import React from 'react';

const AboutUser = ({ user }) => {
  return (
    <div className="max-w-sm mx-auto overflow-hidden">
      <div className='flex items-center justify-center mt-5'>
        <img 
          className="w-36 h-52 md:w-32 lg:w-48  border rounded-lg shadow-lg object-cover " 
          src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'
          alt={`${user.name}'s profile`} 
        />
      </div>
      
      <div className="p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className='text-xs text-gray-600'>{user.username}</p>
        <p className="mt-2 text-gray-600">2nd year, Computer Science</p>
      </div>
    </div>
  );
};

export default AboutUser;
