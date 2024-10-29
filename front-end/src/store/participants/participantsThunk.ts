import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchParticipants = createAsyncThunk('participants/fetchParticipants', async () => {
  try {
    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/['"]/g, '');
    }

    if (!token) {
      console.log('No token found');
    }

    const response = await fetch(`${baseUrl}participant`, {
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
