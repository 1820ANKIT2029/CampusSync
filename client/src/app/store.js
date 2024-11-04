import { combineReducers } from 'redux';
import authReducer from '../features/authentication/authSlice.js'
import eventReducer from '../features/HomePageSlice/eventSlice.js'
import { configureStore } from '@reduxjs/toolkit';



const rootReducer = combineReducers({
  auth: authReducer,
  event:eventReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
