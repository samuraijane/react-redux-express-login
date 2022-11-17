import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authenticationSlice';

export default configureStore({
  reducer: {
    isAuth: authenticationReducer
  }
});