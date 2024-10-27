import { createSlice } from '@reduxjs/toolkit';
import { tasks } from '../../data/tasks';
import { Task } from '../../interfaces/Task.interface';
import { RootState } from '../store';

interface TaskState {
  tasks: Task[];
  task: Task | null;
}

const initialState: TaskState = {
  tasks: tasks,
  task: null
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {}
});

export const getTasks = (state: RootState) => state.tasks.tasks;
