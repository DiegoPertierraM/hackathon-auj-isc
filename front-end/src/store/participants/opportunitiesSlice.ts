import { createSlice } from '@reduxjs/toolkit';
import { opportunities } from '../../data/opportunities';
import { Opportunity } from '../../interfaces/Opportunity.interface';
import { RootState } from '../store';

interface OpportunityState {
  opportunities: Opportunity[];
  opportunity: Opportunity | null;
}

const initialState: OpportunityState = {
  opportunities: opportunities,
  opportunity: null
};

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {}
});

export const getOpportunities = (state: RootState) => state.opportunities.opportunities;
