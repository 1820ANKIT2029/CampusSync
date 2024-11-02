import React, {useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { setAuth } from '../features/authentication/authSlice';

function Home() {
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      dispatch(toggleAuth(false))
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full bg-purple-600 py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        Logout
      </button>
      <NavLink to='/test' className='w-full bg-purple-600 py-2 rounded-md hover:bg-purple-700 transition-colors'>test</NavLink>
    </div>
  );
}

export default Home;
