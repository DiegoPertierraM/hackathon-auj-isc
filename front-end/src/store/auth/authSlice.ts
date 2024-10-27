import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User.interface';
import { RootState } from '../store';
import { loginThunk } from './authThunk';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogout(state) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    }
  },

  extraReducers(builder) {
    builder.addCase(loginThunk.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginThunk.rejected, state => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = 'Error en la petición';
    });
  }
});

export const getUserData = (state: RootState) => state.auth.user;
export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const getLoading = (state: RootState) => state.auth.isLoading;
export const { onLogout } = authSlice.actions;
