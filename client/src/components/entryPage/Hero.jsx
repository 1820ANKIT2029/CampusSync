import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../redux/features/isAdmin/adminSlice';
import { setAuth } from '../../redux/features/authentication/authSlice';

function Hero() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const { isAdmin } = useSelector((state)=> state.userProfile);

    useEffect(()=>{
      if(isAdmin && isAuthenticated){
        navigate('/admin');
      }
      else if(!isAdmin && isAuthenticated){
        navigate('/home');
      }
      else{
        dispatch(setAdmin(false));
        dispatch(setAuth(false));
      }
    },[])

    const handleSubmit = () => {
        dispatch(setAdmin(false));
        navigate('/login')
    }
  return (
    <section className="bg-blue-100 sm:py-40 md:py-52 md:mb-16 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Welcome to CampusSync
        </h1>
        <p className="text-lg text-blue-600 mb-8">
          Make campus life engaging and exciting with our all-in-one platform designed just for students.
        </p>
        <button onClick={handleSubmit} className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;
