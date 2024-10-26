import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { participantsSlice } from './participants/participantsSlice';
import { opportunitiesSlice } from './participants/opportunitiesSlice';

export const store = configureStore({
  reducer: {
    participants: participantsSlice.reducer,
    opportunities: opportunitiesSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
