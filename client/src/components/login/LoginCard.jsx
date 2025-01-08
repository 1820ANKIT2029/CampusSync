import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/features/authentication/authSlice.js';
import { fetchAdminProfile } from '../../redux/features/adminProfile/adminProfileSlice.js';
import { fetchuserProfile } from '../../redux/features/user/userProfileSlice.js';
import { setAdmin } from '../../redux/features/isAdmin/adminSlice.js';

function LoginCard() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const checkboxRef = useRef(null);

  const isadmin = useSelector((state) => state.admin.isadmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    if (checkboxRef.current.checked) {
      dispatch(setAdmin(true));
    } else {
      dispatch(setAdmin(false));
    }
  };

  const loginWithLocal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login/v1", values, {
        withCredentials: true
      });

      if (response.status === 200) {
        dispatch(setAuth(true));
        dispatch(fetchuserProfile());
        if (isadmin) {
          navigate('/admin');
        }
        else {
          navigate('/home');
        }
      }
      else {
        console.log(response);
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.log("unable to login");
      navigate('/signup')
    }
  };


  const loginwithgoogle = () => {
    window.open("http://localhost:3000/auth/login/OAuth/callback", "_self");
  }

  return (
    <div className="flex items-center justify-center bg-blue-100">
      <div className="bg-gray-800 text-white p-8 rounded-lg w-80 shadow-lg">
        <h2 className={`${(isadmin) ? "hidden" : ""} text-center text-lg font-semibold mb-6`}>Log in with</h2>

        <h2 className={`${(isadmin) ? "" : "hidden"} text-center text-lg font-semibold mb-6`}>Entering as Admin</h2>

        <div className={`${(isadmin) ? "hidden" : ""} flex justify-between mb-6`}>
          <button onClick={loginwithgoogle} className="bg-white text-black w-full py-2 rounded-md mr-2 flex items-center justify-center">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="mr-2" />
            Google
          </button>
        </div>

        <p className={`${(isadmin) ? "hidden" : ""} text-center text-sm text-gray-400 mb-4`}>or</p>


        <form onSubmit={loginWithLocal}>
          <input
            type="text"
            placeholder="your username"
            value={values.username}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, username: e.target.value }));
            }}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="your password"
            value={values.password}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, password: e.target.value }));
            }}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account? <Link to="/signup" className="text-purple-500">Sign up</Link>
        </p>

        <br />

        <div className='flex items-center justify-center space-x-1'>
          <input type="checkbox"
            ref={checkboxRef}
            onChange={handleCheckboxChange}
            defaultChecked={isadmin}
          />
          <label for="admin"> Login as Admin </label>
        </div>
      </div>
    </div>
  )
}

export default LoginCard
