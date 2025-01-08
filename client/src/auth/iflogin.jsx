import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/features/authentication/authSlice';
import Cookies from 'js-cookie';
import { setAdmin } from '../redux/features/isAdmin/adminSlice';
import { fetchuserProfile } from '../redux/features/user/userProfileSlice';

const IfLogin = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { state } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if(state === "idle")
    dispatch(fetchuserProfile());

  useEffect(() => {
    const myCookie = Cookies.get('connect.sid');
    if (myCookie) {
      dispatch(fetchuserProfile()); 
      dispatch(setAuth(true));
      navigate('/home')
    } else {
      dispatch(setAuth(false));
      dispatch(setAdmin(false));
    }
  }, [dispatch, navigate]);

  return children;
};

export default IfLogin;
