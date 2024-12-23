import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // استيراد slice الخاص بـ auth
const store = configureStore({
  reducer: {
    auth: authReducer, // إضافة reducer الخاص بالمصادقة
  },
});

export default store;