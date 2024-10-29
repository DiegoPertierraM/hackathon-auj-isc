import { createSlice } from '@reduxjs/toolkit';
import { Participant } from '../../interfaces/Participant.interface';
import { RootState } from '../store';
import { createParticipant, deleteParticipant, fetchParticipants, updateParticipant } from './participantsThunk';

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

    // builder.addCase(createParticipant.pending, state => {
    //   state.loading = 'loading';
    //   state.error = null;
    // });
    builder.addCase(createParticipant.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.participants.push(action.payload);
    });
    builder.addCase(createParticipant.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load participants';
    });

    // builder.addCase(deleteParticipant.pending, state => {
    //   state.loading = 'loading';
    //   state.error = null;
    // });
    builder.addCase(deleteParticipant.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.participants = state.participants.filter(participant => participant.id !== action.payload.id);
    });
    builder.addCase(deleteParticipant.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load participants';
    });

    // builder.addCase(updateParticipant.pending, state => {
    //   state.loading = 'loading';
    //   state.error = null;
    // });
    builder.addCase(updateParticipant.fulfilled, (state, action) => {
      state.loading = 'succeeded';

      const index = state.participants.findIndex(participant => participant.id === action.payload.id);
      state.participants[index] = action.payload;
    });
    builder.addCase(updateParticipant.rejected, (state, action) => {
      console.log('rejected-UPDATE');
      console.log({ object: action });
      state.loading = 'failed';
      state.error = action.error.message || 'Failed to load participants';
    });
  }
});

export const getParticipants = (state: RootState) => state.participants.participants;
export const getLoading = (state: RootState) => state.participants.loading;
export const getError = (state: RootState) => state.participants.error;
