import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchCollaborators = createAsyncThunk('collaborators/fetchCollaborators', async () => {
  try {
    const token = localStorage.getItem('token')!.replace(/['"]/g, '');

    if (!token) {
      console.log('No token found');
    }

    const response = await fetch(`${baseUrl}collaborators`, {
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
