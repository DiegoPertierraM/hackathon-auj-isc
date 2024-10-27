import { createSlice } from '@reduxjs/toolkit';
import { Participant } from '../../interfaces/Participant.interface';
import { RootState } from '../store';
import { fetchParticipants } from './participantsThunk';

interface ParticipantState {
  participants: Participant[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ParticipantState = {
  participants: [],
  loading: 'idle',
  error: null
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchParticipants.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(fetchParticipants.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.participants = action.payload;
    });
    builder.addCase(fetchParticipants.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load participants';
    });
  }
});

export const getParticipants = (state: RootState) => state.participants.participants;
export const getLoading = (state: RootState) => state.participants.loading;
export const getError = (state: RootState) => state.participants.error;
