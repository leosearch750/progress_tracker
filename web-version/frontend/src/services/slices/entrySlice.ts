/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { entryService } from '../api';
import { type DailyEntry } from '../../types/data.types';

// Thunks asynchrones
export const createEntry = createAsyncThunk(
  'entries/createEntry',
  async (entryData: any, { rejectWithValue }) => {
    try {
      const response = await entryService.createEntry(entryData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création de l\'entrée');
    }
  }
);

export const getAllEntries = createAsyncThunk(
  'entries/getAllEntries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await entryService.getAllEntries();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération des entrées');
    }
  }
);

export const getEntryById = createAsyncThunk(
  'entries/getEntryById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await entryService.getEntryById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération de l\'entrée');
    }
  }
);

export const deleteEntry = createAsyncThunk(
  'entries/deleteEntry',
  async (id: string, { rejectWithValue }) => {
    try {
      await entryService.deleteEntry(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la suppression de l\'entrée');
    }
  }
);

// Interface d'état
interface EntryState {
  entries: DailyEntry[];
  currentEntry: DailyEntry | null;
  loading: boolean;
  error: string | null;
}

// État initial
const initialState: EntryState = {
  entries: [],
  currentEntry: null,
  loading: false,
  error: null,
};

// Slice Redux
const entrySlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    clearEntryError: (state) => {
      state.error = null;
    },
    setCurrentEntry: (state, action: PayloadAction<DailyEntry | null>) => {
      state.currentEntry = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create entry
    builder.addCase(createEntry.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEntry.fulfilled, (state, action: PayloadAction<DailyEntry>) => {
      state.loading = false;
      state.entries.unshift(action.payload);
      state.currentEntry = action.payload;
    });
    builder.addCase(createEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get all entries
    builder.addCase(getAllEntries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllEntries.fulfilled, (state, action: PayloadAction<DailyEntry[]>) => {
      state.loading = false;
      state.entries = action.payload;
    });
    builder.addCase(getAllEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get entry by id
    builder.addCase(getEntryById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getEntryById.fulfilled, (state, action: PayloadAction<DailyEntry>) => {
      state.loading = false;
      state.currentEntry = action.payload;
    });
    builder.addCase(getEntryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete entry
    builder.addCase(deleteEntry.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEntry.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
      if (state.currentEntry && state.currentEntry.id === action.payload) {
        state.currentEntry = null;
      }
    });
    builder.addCase(deleteEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearEntryError, setCurrentEntry } = entrySlice.actions;
export default entrySlice.reducer;
