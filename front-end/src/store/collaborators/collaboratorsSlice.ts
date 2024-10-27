import { createSlice } from '@reduxjs/toolkit';
import { Collaborator } from '../../interfaces/Collaborator.interface.ts';
import { RootState } from '../store';
import {
  fetchCollaborators,
  createCollaborator,
  updateCollaborator,
  deleteCollaborator
} from './collaboratorsThunk.ts';

interface CollaboratorState {
  collaborators: Collaborator[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CollaboratorState = {
  collaborators: [],
  loading: 'idle',
  error: null
};

export const collaboratorsSlice = createSlice({
  name: 'collaborators',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCollaborators.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(fetchCollaborators.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.collaborators = action.payload;
    });
    builder.addCase(fetchCollaborators.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load collaborators';
    });
    builder.addCase(createCollaborator.fulfilled, (state, action) => {
      state.collaborators.push(action.payload);
    });
    builder.addCase(updateCollaborator.fulfilled, (state, action) => {
      const index = state.collaborators.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.collaborators[index] = action.payload;
      }
    });
    builder.addCase(deleteCollaborator.fulfilled, (state, action) => {
      state.collaborators = state.collaborators.filter(c => c.id !== action.payload);
    });
  }
});

export const getCollaborators = (state: RootState) => state.collaborators.collaborators;
export const getLoading = (state: RootState) => state.collaborators.loading;
export const getError = (state: RootState) => state.collaborators.error;
