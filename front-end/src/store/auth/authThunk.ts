import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User.interface';
import { saveUserData } from '../../utils/userDataStore';

interface LoginThunkArg {
  email: string;
  password: string;
}

interface RegisterThunkArg {
  name: string;
  password: string;
  email: string;
  confirmPassword: string;
  phone: string | undefined;
}

export const loginThunk = createAsyncThunk<User, LoginThunkArg, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }: LoginThunkArg, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}user/login`, {
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

export const registerThunk = createAsyncThunk<void, RegisterThunkArg, { rejectValue: string }>(
  'auth/register',
  async ({ name, password, email, phone }: RegisterThunkArg, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const body = { name, password, email, ...(phone ? { phone } : {}) };

      const response = await fetch(`${baseUrl}user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
      return rejectWithValue('Error en la petición');
    }
  }
);
