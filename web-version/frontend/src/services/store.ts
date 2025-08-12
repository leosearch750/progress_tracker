import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import goalReducer from './slices/goalSlice';
import entryReducer from './slices/entrySlice';
import importunityReducer from './slices/importunitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    entries: entryReducer,
    importunities: importunityReducer
  },
});

// Exporter explicitement ces types pour qu'ils soient disponibles dans toute l'application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
