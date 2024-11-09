import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice.js';
import eventReducer from '../features/HomePageSlice/eventSlice.js';
import adminReducer from '../features/isAdmin/adminSlice.js';
import adminDataReducer from '../features/adminData/adminDataSlice.js';
import userProfileReducer from '../features/user/userProfileSlice.js';
import blogsReducer from '../features/blogs/blogsSlice.js';
import eventsReducer from '../features/events/eventsSlice.js';
import eventParticipationReducer from '../features/user/eventParticipationSlice.js'



const rootReducer = combineReducers({
  auth: authReducer,
  event:eventReducer,
  admin:adminReducer,
  adminData:adminDataReducer,
  userProfile:userProfileReducer,
  blogs:blogsReducer,
  events:eventsReducer,
  eventParticipation:eventParticipationReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
