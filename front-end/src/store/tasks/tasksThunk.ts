import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../interfaces/Task.interface';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/['"]/g, '');
    }

    if (!token) {
      console.log('No token found');
    }

    const response = await fetch(`${baseUrl}task`, {
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

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (newTask: Omit<Task, 'id'>): Promise<Task> => {
    const token = localStorage.getItem('token')?.replace(/['"]/g, '');

    console.log({ newTask });

    const response = await fetch(`${baseUrl}task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newTask)
    });
    const data = await response.json();
    return data;
  }
);

export const updateTask = createAsyncThunk('tasks/updateTask', async (updatedTask: Task) => {
  const token = localStorage.getItem('token')?.replace(/['"]/g, '');

  const response = await fetch(`${baseUrl}task/${updatedTask.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedTask)
  });
  return (await response.json()) as Task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: number) => {
  const token = localStorage.getItem('token')?.replace(/['"]/g, '');

  await fetch(`${baseUrl}task/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return taskId;
});
