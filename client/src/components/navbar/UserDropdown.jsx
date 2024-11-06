import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { setAuth } from '../../features/authentication/authSlice';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logOut = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        dispatch(setAuth(false));
        console.log("isAuthenticated: ", isAuthenticated);
        navigate('/')
      }
      else{
        console.log(response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  }

  return (
    <div className={`rounded-lg relative inline-block`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full "
      >
        <img className='rounded-full w-10 h-10' src="https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-17.jpg" alt="user picture" />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-32 mt-2  rounded-md  z-10">
          <div className="py-1 rounded-lg" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className="block w-full text-center px-4 py-2 text-sm text-white rounded-t bg-violet-400 hover:bg-white hover:text-black"
              onClick={() => handleOptionClick('Profile')}
            >
              Profile
            </button>
            <button
              className="block w-full text-center px-4 py-2 text-sm text-white  rounded-b bg-violet-400 hover:bg-white hover:text-black"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
