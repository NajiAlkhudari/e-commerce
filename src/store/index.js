import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; 
import registerReducer from './registerSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
    register : registerReducer,

  },
});

export default store;