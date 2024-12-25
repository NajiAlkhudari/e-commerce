import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';  // استيراد مكتبة js-cookie لتخزين التوكن في الكوكيز

// createAsyncThunk لتسجيل الدخول
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;

  try {
    const response = await axios.post('/api/login', { email, password });

  
    const { token } = response.data;
    if (token) {
      Cookies.set('token', token, { expires: 1, path: '' });  
    }

    return response.data; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
    token: null,
    role : null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      Cookies.remove('token');  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role=action.payload.user.role;


   
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const { logout } = authSlice.actions;
export default authSlice.reducer;
