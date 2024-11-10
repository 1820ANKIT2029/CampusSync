import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice.js';
import eventReducer from '../features/HomePageSlice/eventSlice.js';
import adminReducer from '../features/isAdmin/adminSlice.js';
import adminDataReducer from '../features/adminData/adminDataSlice.js';
import userProfileReducer from '../features/user/userProfileSlice.js';
import blogsReducer from '../features/blogs/blogsSlice.js';
import eventsReducer from '../features/events/eventsSlice.js';
import userStatsReducer from '../features/user/userStatsSlice.js';
import userEventsReducer from '../features/user/userEventsSlice.js';
import eventInfoReducer from '../features/events/eventInfoSlice.js';
import taskSubReducer from '../features/events/taskSubSlice.js'



const rootReducer = combineReducers({
  auth: authReducer,
  event:eventReducer,
  admin:adminReducer,
  adminData:adminDataReducer,
  userProfile:userProfileReducer,
  blogs:blogsReducer,
  events:eventsReducer,
  userStats:userStatsReducer,
  userEvents:userEventsReducer,
  eventInfo:eventInfoReducer,
  taskSub:taskSubReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
