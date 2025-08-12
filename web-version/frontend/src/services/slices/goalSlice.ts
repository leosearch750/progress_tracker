/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { goalService } from '../api';
import { type AnnualGoal } from '../../types/data.types';

// Thunks asynchrones
export const createOrUpdateGoal = createAsyncThunk(
  'goals/createOrUpdateGoal',
  async (goalData: any, { rejectWithValue }) => {
    try {
      const response = await goalService.createOrUpdateGoal(goalData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création/mise à jour de l\'objectif');
    }
  }
);

export const getGoalByYear = createAsyncThunk(
  'goals/getGoalByYear',
  async (year: number, { rejectWithValue }) => {
    try {
      const response = await goalService.getGoalByYear(year);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération de l\'objectif');
    }
  }
);

// Interface d'état
interface GoalState {
  currentGoal: AnnualGoal | null;
  loading: boolean;
  error: string | null;
}

// État initial
const initialState: GoalState = {
  currentGoal: null,
  loading: false,
  error: null,
};

// Slice Redux
const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    clearGoalError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create or update goal
    builder.addCase(createOrUpdateGoal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrUpdateGoal.fulfilled, (state, action: PayloadAction<AnnualGoal>) => {
      state.loading = false;
      state.currentGoal = action.payload;
    });
    builder.addCase(createOrUpdateGoal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get goal by year
    builder.addCase(getGoalByYear.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getGoalByYear.fulfilled, (state, action: PayloadAction<AnnualGoal>) => {
      state.loading = false;
      state.currentGoal = action.payload;
    });
    builder.addCase(getGoalByYear.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.currentGoal = null;
    });
  },
});

export const { clearGoalError } = goalSlice.actions;
export default goalSlice.reducer;
