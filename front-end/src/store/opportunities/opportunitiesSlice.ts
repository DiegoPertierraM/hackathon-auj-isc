import { createSlice } from '@reduxjs/toolkit';
import { Opportunity } from '../../interfaces/Opportunity.interface';
import { RootState } from '../store';
import { createOpportunity, deleteOportunity, getAllOpportunities, updateOportinity } from './opportunitiesThunk';

interface OpportunityState {
  opportunities: Opportunity[];
  opportunity: Opportunity | null;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OpportunityState = {
  opportunities: [],
  opportunity: null,
  loading: 'idle',
  error: null
};

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllOpportunities.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });

    builder.addCase(getAllOpportunities.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.opportunities = action.payload;
    });
    builder.addCase(getAllOpportunities.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload || 'Error desconocido';
    });

    builder.addCase(createOpportunity.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(createOpportunity.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.opportunities.push(action.payload);
    });
    builder.addCase(createOpportunity.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload || 'Error desconocido';
    });

    builder.addCase(deleteOportunity.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(deleteOportunity.fulfilled, (state, action) => {
      state.loading = 'succeeded';

      state.opportunities = state.opportunities.filter(opportunity => opportunity.id !== action.payload.id);
    });
    builder.addCase(deleteOportunity.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload || 'Error desconocido';
    });

    builder.addCase(updateOportinity.pending, state => {
      state.loading = 'loading';
      state.error = null;
    });
    builder.addCase(updateOportinity.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const index = state.opportunities.findIndex(opportunity => opportunity.id === action.payload.id);
      state.opportunities[index] = action.payload;
    });
    builder.addCase(updateOportinity.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload || 'Error desconocido';
    });
  }
});

export const getOpportunities = (state: RootState) => state.opportunities.opportunities;

export const getLoading = (state: RootState) => state.opportunities.loading;
export const getError = (state: RootState) => state.opportunities.error;
