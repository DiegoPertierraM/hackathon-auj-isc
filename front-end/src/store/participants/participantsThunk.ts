import { createAsyncThunk } from '@reduxjs/toolkit';
import { Participant, ParticipantsCreate } from '../../interfaces/Participant.interface';

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

export const createParticipant = createAsyncThunk<Participant, ParticipantsCreate, { rejectValue: string }>(
  'participants/post',
  async (participant, thunkAPI) => {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        token = token.replace(/['"]/g, '');
      }

      if (!token) {
        console.log('No token found');
      }

      const response = await fetch(`${baseUrl}participant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(participant)
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Error de red o del servidor');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);

export const deleteParticipant = createAsyncThunk<Participant, number, { rejectValue: string }>(
  'participants/delete',
  async (id, thunkAPI) => {
    try {
      let token = localStorage.getItem('token');
      if (token) {
        token = token.replace(/['"]/g, '');
      }

      if (!token) {
        console.log('No token found');
      }

      const response = await fetch(`${baseUrl}participant/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Error en la petición');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
interface UpdateParticipantPayload {
  participantId: number;
  participant: Participant;
}

export const updateParticipant = createAsyncThunk<Participant, UpdateParticipantPayload, { rejectValue: string }>(
  'participants/update',
  async ({ participantId, participant }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')?.replace(/['"]/g, '');

      const response = await fetch(`${baseUrl}participant/${participantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(participant)
      });

      console.log({ response });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Error de red o del servidor');
      }

      const data = await response.json();

      console.log({ data });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);
