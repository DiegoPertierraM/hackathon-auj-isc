import { createSlice } from '@reduxjs/toolkit';
import { collaborators } from '../../data/collaborators.ts';
import { Collaborator } from '../../interfaces/Collaborator.interface.ts';
import { RootState } from '../store';

interface CollaboratorState {
  collaborators: Collaborator[];
  collaborator: Collaborator | null;
}

const initialState: CollaboratorState = {
  collaborators: collaborators,
  collaborator: null
};

export const collaboratorsSlice = createSlice({
  name: 'collaborators',
  initialState,
  reducers: {}
});

export const getCollaborators = (state: RootState) => state.collaborators.collaborators;
