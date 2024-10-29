import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../interfaces/User.interface';
import { RootState } from '../store';
import { addTaskToUser, fetchUsers } from './usersThunk';

interface userState {
  users: UserData[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: userState = {
  users: [],
  loading: 'idle',
  error: null
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load users';
    });

    builder.addCase(addTaskToUser.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(addTaskToUser.fulfilled, state => {
      state.loading = 'succeeded';
    });
    builder.addCase(addTaskToUser.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load users';
    });
  }
});

export const getUsers = (state: RootState) => state.users.users;
export const getLoading = (state: RootState) => state.users.loading;
export const getError = (state: RootState) => state.users.error;
