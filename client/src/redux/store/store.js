import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice.js';
import eventReducer from '../features/HomePageSlice/eventSlice.js';
import adminReducer from '../features/isAdmin/adminSlice.js';
import adminDataReducer from '../features/adminData/adminDataSlice.js';
import userProfileReducer from '../features/user/userProfileSlice.js';
import blogsReducer from '../features/blogs/blogsSlice.js';



const rootReducer = combineReducers({
  auth: authReducer,
  event:eventReducer,
  admin:adminReducer,
  adminData:adminDataReducer,
  userProfile:userProfileReducer,
  blogs:blogsReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
