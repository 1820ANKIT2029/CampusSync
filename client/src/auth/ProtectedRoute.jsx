import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../redux/features/authentication/authSlice';
import Cookies from 'js-cookie';
import { setAdmin } from '../redux/features/isAdmin/adminSlice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const myCookie = Cookies.get('connect.sid');
    if (myCookie) {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
      dispatch(setAdmin(false));
      navigate('/');
    }
  }, [dispatch, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
