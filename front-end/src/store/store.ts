import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { collaboratorsSlice } from './collaborators/collaboratorsSlice';
import { opportunitiesSlice } from './opportunities/opportunitiesSlice';
import { participantsSlice } from './participants/participantsSlice';
import { tasksSlice } from './tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    collaborators: collaboratorsSlice.reducer,
    participants: participantsSlice.reducer,
    opportunities: opportunitiesSlice.reducer,
    tasks: tasksSlice.reducer,
    auth: authSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
