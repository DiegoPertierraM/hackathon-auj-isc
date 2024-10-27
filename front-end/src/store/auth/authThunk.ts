import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User.interface';
import { saveUserData } from '../../utils/userDataStore';

interface LoginThunkArg {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<User, LoginThunkArg, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }: LoginThunkArg, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();

      saveUserData(data);
      return data;
    } catch (error) {
      return rejectWithValue('Error en la petición');
    }
  }
);
