import { combineReducers } from 'redux';
import authReducer from '../features/authentication/authSlice.js'
import { configureStore } from '@reduxjs/toolkit';



const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
