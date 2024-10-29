import { createAsyncThunk } from '@reduxjs/toolkit';
import { Opportunity, OpportunityCreate } from '../../interfaces/Opportunity.interface';

const baseUrl = import.meta.env.VITE_API_URL;

export const getAllOpportunities = createAsyncThunk<Opportunity[], void, { rejectValue: string }>(
  'opportunities/get',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')?.replace(/['"]/g, '');

      const response = await fetch(`${baseUrl}opportunity`, {
        method: 'GET',
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
      return thunkAPI.rejectWithValue('Error de red o del servidor');
    }
  }
);

export const createOpportunity = createAsyncThunk<Opportunity, OpportunityCreate, { rejectValue: string }>(
  'opoortunities/create',
  async (opportunity, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')?.replace(/['"]/g, '');

      const response = await fetch(`${baseUrl}opportunity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(opportunity)
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Error en la petición');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error de red o del servidor');
    }
  }
);

export const deleteOportunity = createAsyncThunk<Opportunity, number, { rejectValue: string }>(
  'opoortunities/delete',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')?.replace(/['"]/g, '');

      const response = await fetch(`${baseUrl}opportunity/${id}`, {
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
      console.log({ data });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error de red o del servidor');
    }
  }
);

interface UpdateOpportunityPayload {
  oportunittieId: number;
  opportunity: OpportunityCreate;
}

export const updateOportinity = createAsyncThunk<Opportunity, UpdateOpportunityPayload, { rejectValue: string }>(
  'opoortunities/update',
  async ({ oportunittieId, opportunity }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')?.replace(/['"]/g, '');

      const response = await fetch(`${baseUrl}opportunity/${oportunittieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(opportunity)
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
  }
);
