import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchuserProfile } from '../../../redux/features/user/userProfileSlice';

const y = ["year not-set","first year", "second year", "pre-final year", "final year"];

const AboutUser = ({ name,username, email,year,branch, profilePic }) => {

  return (
    <div className="max-w-sm mx-auto overflow-hidden">
      <div className='flex items-center justify-center mt-5'>
        <img 
          className="w-36 h-52 md:w-32 lg:w-48 bg-blue-100  border rounded-lg shadow-lg object-cover " 
          src={profilePic}
          alt={`${name}'s profile`} 
        />
      </div>
      
      <div className="p-6 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className='text-xs text-gray-600'>{username}</p>
        <p className="mt-2 text-gray-600">{y[year]}, {branch == null ?"branch not-set":branch}</p>
      </div>
    </div>
  );
};

export default AboutUser;
