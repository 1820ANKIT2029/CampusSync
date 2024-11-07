import { combineReducers } from 'redux';
import authReducer from '../features/authentication/authSlice.js';
import eventReducer from '../features/HomePageSlice/eventSlice.js';
import adminReducer from '../features/isAdmin/adminSlice.js';
import { configureStore } from '@reduxjs/toolkit';
import adminDataReducer from '../features/adminData/adminDataSlice.js';
import userProfileReducer from '../features/user/userProfileSlice.js';
import adminProfileReducer from '../features/adminProfile/adminProfileSlice.js';



const rootReducer = combineReducers({
  auth: authReducer,
  event:eventReducer,
  admin:adminReducer,
  adminData:adminDataReducer,
  userProfile:userProfileReducer,
  adminProfile:adminProfileReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
