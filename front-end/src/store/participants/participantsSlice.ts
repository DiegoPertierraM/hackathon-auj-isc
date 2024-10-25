import { createSlice } from '@reduxjs/toolkit';
import { participants } from '../../data/participants';
import { Participant } from '../../interfaces/Participant.interface';
import { RootState } from '../store';

interface ParticipantState {
  participants: Participant[];
  participant: Participant | null;
}

const initialState: ParticipantState = {
  participants: participants,
  participant: null
};

export const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {}
});

export const getParticipants = (state: RootState) => state.participants.participants;
