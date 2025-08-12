/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { importunityService } from '../api';
import { type Importunity } from '../../types/data.types';

// Thunks asynchrones
export const createImportunity = createAsyncThunk(
  'importunities/createImportunity',
  async (importunityData: any, { rejectWithValue }) => {
    try {
      const response = await importunityService.createImportunity(importunityData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création de l\'importunité');
    }
  }
);

export const getAllImportunities = createAsyncThunk(
  'importunities/getAllImportunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await importunityService.getAllImportunities();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération des importunités');
    }
  }
);

export const updateImportunityCounter = createAsyncThunk(
  'importunities/updateImportunityCounter',
  async ({ id, counter }: { id: string; counter: number }, { rejectWithValue }) => {
    try {
      const response = await importunityService.updateImportunityCounter(id, counter);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la mise à jour du compteur');
    }
  }
);

export const deleteImportunity = createAsyncThunk(
  'importunities/deleteImportunity',
  async (id: string, { rejectWithValue }) => {
    try {
      await importunityService.deleteImportunity(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la suppression de l\'importunité');
    }
  }
);

// Interface d'état
interface ImportunityState {
  importunities: Importunity[];
  currentImportunity: Importunity | null;
  loading: boolean;
  error: string | null;
}

// État initial
const initialState: ImportunityState = {
  importunities: [],
  currentImportunity: null,
  loading: false,
  error: null,
};

// Slice Redux
const importunitySlice = createSlice({
  name: 'importunities',
  initialState,
  reducers: {
    clearImportunityError: (state) => {
      state.error = null;
    },
    setCurrentImportunity: (state, action: PayloadAction<Importunity | null>) => {
      state.currentImportunity = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create importunity
    builder.addCase(createImportunity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createImportunity.fulfilled, (state, action: PayloadAction<Importunity>) => {
      state.loading = false;
      state.importunities.unshift(action.payload);
      state.currentImportunity = action.payload;
    });
    builder.addCase(createImportunity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get all importunities
    builder.addCase(getAllImportunities.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllImportunities.fulfilled, (state, action: PayloadAction<Importunity[]>) => {
      state.loading = false;
      state.importunities = action.payload;
    });
    builder.addCase(getAllImportunities.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Update importunity counter
    builder.addCase(updateImportunityCounter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateImportunityCounter.fulfilled, (state, action: PayloadAction<Importunity>) => {
      state.loading = false;
      state.importunities = state.importunities.map(imp => 
        imp.id === action.payload.id ? action.payload : imp
      );
      if (state.currentImportunity && state.currentImportunity.id === action.payload.id) {
        state.currentImportunity = action.payload;
      }
    });
    builder.addCase(updateImportunityCounter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete importunity
    builder.addCase(deleteImportunity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteImportunity.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.importunities = state.importunities.filter(imp => imp.id !== action.payload);
      if (state.currentImportunity && state.currentImportunity.id === action.payload) {
        state.currentImportunity = null;
      }
    });
    builder.addCase(deleteImportunity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearImportunityError, setCurrentImportunity } = importunitySlice.actions;
export default importunitySlice.reducer;
