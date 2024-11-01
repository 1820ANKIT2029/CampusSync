import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
    const [values,setValues] = useState({
        username: "",
        password: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post('http://localhost:3000/auth/login/v1',values)
        .then((response) => {
            console.log(response);
        })
        setValues({
            username:"",
            password:"",
        })
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg w-80 shadow-lg">
        <h2 className="text-center text-lg font-semibold mb-6">Log in with</h2>
        
        <div className="flex justify-between mb-6">
          <button className="bg-white text-black w-full py-2 rounded-md mr-2 flex items-center justify-center">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="mr-2"/>
            Google
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-400 mb-4">or</p>
        
        <form onSubmit={handleSubmit}>
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
      </div>
    </div>
  )
}

export default Login
