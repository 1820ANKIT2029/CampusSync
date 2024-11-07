import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../redux/features/isAdmin/adminSlice';
import Cookies from 'js-cookie';  

const EnsureAdmin = ({ children }) => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const myCookie = Cookies.get('connect.sid');
    if(!myCookie){
      dispatch(setAdmin(false));
    }
    if(!isAdmin){
        dispatch(setAdmin(false));
        navigate('/');
    }
  }, [dispatch, navigate]);

  return isAdmin ? children : null;
};

export default EnsureAdmin;
