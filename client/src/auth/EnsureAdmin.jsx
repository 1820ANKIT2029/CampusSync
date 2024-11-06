import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../features/isAdmin/adminSlice';

const EnsureAdmin = ({ children }) => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAdmin){
        dispatch(setAdmin(false));
        navigate('/');
    }
  }, [dispatch, navigate]);

  return isAdmin ? children : null;
};

export default EnsureAdmin;
