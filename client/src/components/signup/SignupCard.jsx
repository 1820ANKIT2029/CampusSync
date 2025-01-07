import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../redux/features/isAdmin/adminSlice';

function SignupCard() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: ""
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/auth/signup/v1', values)
        .then((response) => {
          console.log(response);
        })
    } catch (error) {
      console.log(error);
    }

    setValues({
      username: "",
      password: "",
      confirmPassword: "",
      email: ""
    })
    navigate('/login');
  }

  const loginwithgoogle = () => {
    window.open("http://localhost:3000/auth/login/OAuth/callback", "_self")
  }



  return (
    <div className="flex items-center justify-center bg-blue-100">
      <div className="bg-gray-800 text-white p-8 rounded-lg max-w-[400px] shadow-lg">
        <h2 className={`${(isadmin) ? "hidden" : ""} text-center text-lg font-semibold mb-6`}>Log in with</h2>

        <h2 className={`${(isadmin) ? "" : "hidden"} text-center text-lg font-semibold mb-6`}>Entering as Admin</h2>

        <div className={`${(isadmin) ? "hidden" : ""} flex justify-between mb-6`}>
          <button onClick={loginwithgoogle} className="bg-white text-black w-full py-2 rounded-md mr-2 flex items-center justify-center">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="mr-2" />
            Google
          </button>
        </div>

        <p className={`${(isadmin) ? "hidden" : ""} text-center text-sm text-gray-400 mb-4`}>or</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={values.username}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, username: e.target.value }));
            }}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="password"
            value={values.password}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, password: e.target.value }));

            }}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="confirm password"
            value={values.confirmPassword}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, confirmPassword: e.target.value }));

            }}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="your email"
            value={values.email}
            onChange={(e) => {
              setValues((prev) => ({ ...prev, email: e.target.value }));

            }}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            sign up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-purple-500">log in</Link>
        </p>


        <br />

        <div className='flex items-center justify-center space-x-1'>
          <input type="checkbox"
            ref={checkboxRef}
            onChange={handleCheckboxChange}
          />
          <label for="admin"> signup as Admin </label>
        </div>
      </div>
    </div>
  )
}

export default SignupCard
