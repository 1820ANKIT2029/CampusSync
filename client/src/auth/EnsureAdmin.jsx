import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../redux/features/isAdmin/adminSlice.js';
import { fetchuserProfile } from '../redux/features/user/userProfileSlice.js';
import Cookies from 'js-cookie';  
import { setAuth } from '../redux/features/authentication/authSlice.js';

const EnsureAdmin = ({ children }) => {
  const { isAdmin,state } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(state === "idle")
    dispatch(fetchuserProfile());

  useEffect( () => {
    const myCookie = Cookies.get('connect.sid');
    if(myCookie && isAdmin){
        dispatch(setAdmin(true));
    }
    if(!myCookie){
      dispatch(setAdmin(false));
      dispatch(setAuth(false));
      navigate('/')
    }
    
  }, [dispatch, navigate]);

  return isAdmin ? children : null;
};

export default EnsureAdmin;
