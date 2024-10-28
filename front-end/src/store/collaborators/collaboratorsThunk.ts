import { createAsyncThunk } from '@reduxjs/toolkit';
import { Collaborator } from '../../interfaces/Collaborator.interface';

const baseUrl = import.meta.env.VITE_API_URL;
let token = localStorage.getItem('token');
if (token) {
  token = token.replace(/['"]/g, '');
}

export const fetchCollaborators = createAsyncThunk('collaborators/fetchCollaborators', async () => {
  try {
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

export const createCollaborator = createAsyncThunk(
  'collaborators/createCollaborator',
  async (newCollaborator: Omit<Collaborator, 'id'>) => {
    const response = await fetch(`${baseUrl}collaborators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newCollaborator)
    });
    console.log(await response.json());
    return (await response.json()) as Collaborator;
  }
);

export const updateCollaborator = createAsyncThunk(
  'collaborators/updateCollaborator',
  async (updatedCollaborator: Collaborator) => {
    const response = await fetch(`${baseUrl}collaborators/${updatedCollaborator.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedCollaborator)
    });
    return (await response.json()) as Collaborator;
  }
);

export const deleteCollaborator = createAsyncThunk(
  'collaborators/deleteCollaborator',
  async (collaboratorId: number) => {
    await fetch(`${baseUrl}collaborators/${collaboratorId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return collaboratorId;
  }
);
