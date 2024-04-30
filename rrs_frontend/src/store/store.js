import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import reportReducer from './features/reportSlice';

const rootReducer = combineReducers({
  reports: reportReducer,
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
