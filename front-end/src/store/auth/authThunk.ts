import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../interfaces/User.interface';
import { saveUserData } from '../../utils/userDataStore';

interface LoginThunkArg {
  email: string;
  password: string;
}

const user: User = {
  id: 1,
  name: 'test',
  password: 'test1',
  email: 'test@test.com',
  phone: '123123123',
  tasks: [],
  created: 'a',
  updated: 'b'
};
export const loginThunk = createAsyncThunk<User, LoginThunkArg, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }: LoginThunkArg, { rejectWithValue }) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${baseUrl}/login`, {
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

      console.log({ data });
      saveUserData(user);
      return user;
    } catch (error) {
      saveUserData(user);
      return rejectWithValue('Error en la petición');
    }
  }
);
