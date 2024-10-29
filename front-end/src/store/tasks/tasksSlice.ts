import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createTask, deleteTask, fetchTasks, updateTask } from './tasksThunk';
import { Task } from '../../interfaces/Task.interface';

interface taskstate {
  tasks: Task[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: taskstate = {
  tasks: [],
  loading: 'idle',
  error: null
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTasks.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load tasks';
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(c => c.id !== action.payload);
    });
  }
});

export const getTasks = (state: RootState) => state.tasks.tasks;
export const getLoading = (state: RootState) => state.tasks.loading;
export const getError = (state: RootState) => state.tasks.error;
