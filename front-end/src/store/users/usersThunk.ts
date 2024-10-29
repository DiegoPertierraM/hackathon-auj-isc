import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddUserToTask } from '../../components/specific-modals/addUserToTask/AddUserToTask';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/['"]/g, '');
    }

    if (!token) {
      console.log('No token found');
    }

    const response = await fetch(`${baseUrl}user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error en la petición');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

interface AddUserToTask {
  taskId: number;
  userId: number;
}

export const addTaskToUser = createAsyncThunk('user/post', async ({ taskId, userId }: AddUserToTask, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')?.replace(/['"]/g, '');

    const response = await fetch(`${baseUrl}user/${userId}/task/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue('Error en la petición');
    }

    const data = await response.json();
    console.log({ data });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Error de red o del servidor');
  }
});
